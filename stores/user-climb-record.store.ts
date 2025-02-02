import { addClimbSchema } from "@/constants/zod-schema.const";
import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";
import { produce } from "immer";

export type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = ClimbSchema & { id: string };

type SetVideosArgs = {
    id: string;
    videoSources: string[];
};

type State = {
    climbs: LoggedClimb[];
};

type Actions = {
    logClimb: (climb: ClimbSchema) => void;
    reset: () => void;
    destroy: (id: string) => void;
    getLog: (id: string) => LoggedClimb | undefined;
    setVideos: (args: SetVideosArgs) => void;
};

export const useUserClimbRecordStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            climbs: Array<LoggedClimb>(),
            logClimb: (climb) =>
                set((state) => ({
                    climbs: [...state.climbs, { ...climb, id: uuid.v4() }],
                })),
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
                    console.warn(`Could not find climb log with id: ${id}`);
                    return;
                }

                set(
                    produce((state: State) => {
                        state.climbs[climbLogIndex].videoSources = videoSources;
                    })
                );
            },
        }),
        {
            name: "user-climb-record",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
