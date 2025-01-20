import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ClimbType = "Route" | "Boulder";
type RouteGradeOptions = "YDS" | "French";
type BoulderGradeOptions = "Font" | "VGrade";
export type VGradeOptions = "V0" | "V1" | "V2" | "V3" | "V4";

type Settings<T extends string> = {
    gradeSystem: T;
};

type States = {
    routeSettings: Settings<RouteGradeOptions>;
    boulderSettings: Settings<BoulderGradeOptions>;
};

type Actions = {
    updateRouteGradeSystem: (grade: RouteGradeOptions) => void;
    updateBoulderGradeSystem: (grade: BoulderGradeOptions) => void;
};

export const useUserSettingsStore = create<States & Actions>()(
    persist(
        (set) => ({
            boulderSettings: { gradeSystem: "VGrade" },
            routeSettings: { gradeSystem: "French" },
            updateBoulderGradeSystem: (grade) =>
                set((state) => ({
                    ...state,
                    boulderSettings: {
                        gradeSystem: grade,
                    },
                })),
            updateRouteGradeSystem: (grade) =>
                set((state) => ({
                    ...state,
                    routeSettings: {
                        gradeSystem: grade,
                    },
                })),
        }),
        {
            name: "user-settings",
            storage: createJSONStorage(() => asyncStorageJSON),
        }
    )
);
