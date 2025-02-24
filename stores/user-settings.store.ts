import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    BoulderGradeSystemEnum,
    RouteGradeSystemEnum,
} from "../constants/zod-schema.const";
import { z } from "zod";

type RouteGradeOptions = z.infer<typeof RouteGradeSystemEnum>;
type BoulderGradeOptions = z.infer<typeof BoulderGradeSystemEnum>;

type Settings<T extends string> = {
    gradeSystem: T;
};

type States = {
    routeSettings: Settings<RouteGradeOptions>;
    boulderSettings: Settings<BoulderGradeOptions>;
};

type Actions = {
    updateSettings: (settings: States) => void;
};

export const useUserSettingsStore = create<States & Actions>()(
    persist(
        (set) => ({
            boulderSettings: { gradeSystem: "VSCALE" },
            routeSettings: { gradeSystem: "FRENCH" },
            updateSettings: ({ boulderSettings, routeSettings }) =>
                set((_) => ({
                    boulderSettings,
                    routeSettings,
                })),
        }),
        {
            name: "user-settings",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
