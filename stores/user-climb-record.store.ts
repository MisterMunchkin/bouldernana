import { addClimbSchema, jsonExportSchema } from "@/constants/zod-schema.const";
import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v7 as uuidV7 } from "uuid";
import { produce } from "immer";

type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = ClimbSchema & {
	id: string;
};

type SetVideosArgs = Pick<LoggedClimb, "id" | "videoAssetIds">;

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
};

export const useUserClimbRecordStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			climbs: Array<LoggedClimb>(),
			logClimb: (climb) =>
				set((state) => ({
					climbs: [
						...state.climbs,
						{
							...climb,
							id: uuidV7(),
						},
					],
				})),
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
			setVideos: ({ id, videoAssetIds }) => {
				const climbLogIndex = get().climbs.findIndex(
					(log) => log.id === id
				);
				if (climbLogIndex === -1) {
					console.error(`Could not find climb log with id: ${id}`);
					return;
				}

				set(
					produce((state: State) => {
						state.climbs[climbLogIndex].videoAssetIds =
							videoAssetIds;
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
