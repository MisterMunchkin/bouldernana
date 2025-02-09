import AppText, { textVariants } from "@/components/core/app-text";
import { LoggedClimb } from "@/stores/user-climb-record.store";
import { VariantProps } from "class-variance-authority";
import { Href } from "expo-router";
import { ReactNode } from "react";

export namespace ClimbLogUtil {
    export const getClimbLogDataStructure = (
        climbLog: LoggedClimb | undefined
    ): Record<
        "block-1" | "block-2" | "last-block",
        {
            label: string;
            value: number | boolean | undefined | string;
            noData?: ReactNode;
            bgColor?: string;
            size?: VariantProps<typeof textVariants>["size"];
            getHref?: (id: string) => Href;
        }[]
    > => {
        const {
            ascentType,
            attempts,
            hasBeenSent,
            steepness,
            howDidItFeel,
            skill,
            notes,
            link,
        } = climbLog ?? {};

        return {
            "block-1": [
                {
                    label: "Ascent Type",
                    value: ascentType,
                },
                {
                    label: "Attempts",
                    value: attempts,
                },
                {
                    label: "Has this been sent?",
                    value: hasBeenSent ? "Sent!" : "Not yet...",
                },
            ],
            "block-2": [
                {
                    label: "Steepness",
                    value: steepness,
                },
                {
                    label: "How did it feel?",
                    value: howDidItFeel,
                },
            ],
            "last-block": [
                {
                    label: "Skills Needed",
                    value: skill?.join(", "),
                    noData: (
                        <AppText
                            size={"xs"}
                            color={"black-50"}
                            twClassName="italic"
                        >
                            no skill needed
                        </AppText>
                    ),
                    bgColor: "bg-core-imperial-red-800",
                    getHref: (id: string) =>
                        `/climb-log/${id}/update-skills-needed`,
                },
                {
                    label: "Notes",
                    value: notes,
                    noData: (
                        <AppText
                            size={"xs"}
                            color={"gray"}
                            twClassName="italic"
                        >
                            no notes
                        </AppText>
                    ),
                    bgColor: "bg-gray-200",
                    size: "xs",
                    getHref: (id) => `/climb-log/${id}/update-notes`,
                },
                {
                    label: "Link",
                    value: link,
                    noData: (
                        <AppText
                            size={"xs"}
                            color={"gray"}
                            twClassName="italic"
                        >
                            no link
                        </AppText>
                    ),
                    bgColor: "bg-gray-200",
                    size: "xs",
                    getHref: (id) => `/climb-log/${id}/update-link`,
                },
            ],
        };
    };
}
