import { addClimbSchema, jsonExportSchema } from "@/constants/zod-schema.const";
import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";
import { produce } from "immer";
import { FileSystemUtil } from "@/utils/file-system.util";

type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = Omit<ClimbSchema, "videos"> & {
    id: string;
    videoUris: string[];
};

type SetVideosArgs = {
    id: string;
    videoSources: string[];
};

type State = {
    climbs: LoggedClimb[];
};

type Actions = {
    logClimb: (climb: ClimbSchema) => void;
    updateClimb: (id: string, update: Partial<ClimbSchema>) => void;
    reset: () => void;
    destroy: (id: string) => void;
    getLog: (id: string) => LoggedClimb | undefined;
    setVideos: (args: SetVideosArgs) => void;
    flashRecordFromJSON: (
        climbLog: Pick<z.infer<typeof jsonExportSchema>, "climbLogs">
    ) => void;
    deleteVideo: (args: { id: string; videoUri: string }) => void;
    addVideo: (args: {
        id: string;
        video: ClimbSchema["videos"][number];
    }) => void;
};

export const useUserClimbRecordStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            climbs: Array<LoggedClimb>(),
            logClimb: async (climb) => {
                const videoUrisPromise = climb.videos.map((video) =>
                    FileSystemUtil.saveVideo(video)
                );

                const videoUris: string[] = await Promise.all(videoUrisPromise);
                const { videos: _, ...withoutVideo } = climb;
                set((state) => ({
                    climbs: [
                        ...state.climbs,
                        {
                            ...withoutVideo,
                            id: uuid.v4(),
                            videoUris,
                        },
                    ],
                }));
            },
            updateClimb: (id, update) => {
                const index = get().climbs.findIndex(
                    (climb) => climb.id === id
                );
                if (index === -1) {
                    console.warn(`Could not find logged climb with id: ${id}`);
                    return;
                }
                set(
                    produce((state: State) => {
                        state.climbs[index] = {
                            ...state.climbs[index],
                            ...update,
                        };
                    })
                );
            },
            reset: () =>
                set(() => ({
                    climbs: Array<LoggedClimb>(),
                })),
            getLog: (id) => get().climbs.find((log) => log.id === id),
            destroy: (id) =>
                set((state) => ({
                    climbs: state.climbs.filter((climb) => climb.id !== id),
                })),
            setVideos: ({ id, videoSources }) => {
                const climbLogIndex = get().climbs.findIndex(
                    (log) => log.id === id
                );
                if (climbLogIndex === -1) {
                    console.error(`Could not find climb log with id: ${id}`);
                    return;
                }

                set(
                    produce((state: State) => {
                        state.climbs[climbLogIndex].videoUris = videoSources;
                    })
                );
            },
            deleteVideo: async ({ id, videoUri }) => {
                await FileSystemUtil.deleteVideo(videoUri);
                const climbLogIndex = get().climbs.findIndex(
                    (log) => log.id === id
                );
                if (climbLogIndex === -1) {
                    console.error(`Could not find climb log with id: ${id}`);
                    return;
                }
                set(
                    produce((state: State) => {
                        state.climbs[climbLogIndex].videoUris = state.climbs[
                            climbLogIndex
                        ].videoUris?.filter((uri) => uri !== videoUri);
                    })
                );
            },
            addVideo: async ({ id, video }) => {
                const persistentVideoUri = await FileSystemUtil.saveVideo(
                    video
                );
                const climbLogIndex = get().climbs.findIndex(
                    (log) => log.id === id
                );
                if (climbLogIndex === -1) {
                    console.error(`Could not find climb log with id: ${id}`);
                    return;
                }
                set(
                    produce((state: State) => {
                        state.climbs[climbLogIndex].videoUris?.push(
                            persistentVideoUri
                        );
                    })
                );
            },
            flashRecordFromJSON: ({ climbLogs: climbs }) =>
                set(() => ({
                    climbs,
                })),
        }),
        {
            name: "user-climb-record",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
