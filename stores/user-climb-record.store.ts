import { DropDownItem } from "@/components/grade-dropdown-field";
import { addClimbSchema } from "@/constants/zod-schema.const";
import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { VGradeOptions } from "./user-settings.store";
import uuid from "react-native-uuid";

export const VGRADES: DropDownItem<VGradeOptions>[] = Array.from(
    { length: 16 },
    (_, i) => {
        const value = `V${i}` as VGradeOptions;
        return {
            label: value,
            value,
        };
    }
);

export type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = ClimbSchema & { id: string };

type State = {
    climbs: LoggedClimb[];
};

type Actions = {
    logClimb: (climb: ClimbSchema) => void;
    reset: () => void;
};

export const useUserClimbRecordStore = create<State & Actions>()(
    persist(
        (set) => ({
            climbs: [],
            logClimb: (climb) =>
                set((state) => ({
                    climbs: [...state.climbs, { ...climb, id: uuid.v4() }],
                })),
            reset: () =>
                set(() => ({
                    climbs: [],
                })),
        }),
        {
            name: "user-climb-record",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
