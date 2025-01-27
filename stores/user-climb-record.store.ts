import { addClimbSchema } from "@/constants/zod-schema.const";
import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";

export type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = ClimbSchema & { id: string };

type State = {
    climbs: LoggedClimb[];
};

type Actions = {
    logClimb: (climb: ClimbSchema) => void;
    reset: () => void;
    getLog: (id: string) => LoggedClimb | undefined;
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
        }),
        {
            name: "user-climb-record",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
