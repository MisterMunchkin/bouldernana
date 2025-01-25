import { asyncStorageJSON } from "@/utils/async-storage-json.util";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ClimbType = "Route" | "Boulder";
type RouteGradeOptions = "YDS" | "French";
type BoulderGradeOptions = "Font" | "VGrade";
export type VGradeOptions = `V${
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15}`;

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
