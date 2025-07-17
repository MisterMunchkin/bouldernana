import { DropDownItem } from "@/components/core/dropdown-field";
import { FRENCH_GRADES, VGRADES } from "@/constants/core.const";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { LoggedClimb } from "@/types/core.type";
import { convertGrade, GradeScales, VScale, French } from "@openbeta/sandbag";

export const useUserGradeOptions = () => {
	const { gradeSystem: boulderGradeSystem } = useUserSettingsStore(
		(store) => store.boulderSettings
	);
	const { gradeSystem: routeGradeSystem } = useUserSettingsStore(
		(store) => store.routeSettings
	);

	/**
	 * Get Route Grade Options based on user preferences.
	 */
	const getRouteGradeOptions = (): DropDownItem<string>[] => {
		if (routeGradeSystem === "FRENCH")
			return FRENCH_GRADES.map((value) => ({ value, label: value }));
		return FRENCH_GRADES.map((value) => ({
			value,
			label: convertGrade(
				value,
				GradeScales["FRENCH"],
				GradeScales[routeGradeSystem]
			),
		}));
	};

	/**
	 * Get Boulder Grade Options based on user preferences.
	 */
	const getBoulderGradeOptions = (): DropDownItem<string>[] => {
		if (boulderGradeSystem === "VSCALE")
			return VGRADES.map((value) => ({ value, label: value }));
		return VGRADES.map((value) => ({
			value,
			label: convertGrade(
				value,
				GradeScales["VSCALE"],
				GradeScales[boulderGradeSystem]
			),
		}));
	};

	/**
	 * Gets the converted grade based on user preference.
	 *
	 * Default Grade for Boulder is Vscale, and French for Routes.
	 *
	 * If grade is a VScale, it will check the user preference of boulder grades and converts it accordingly
	 *
	 * If grade is a FrenchScale, it will check the user preference of route grades and converts it accordingly
	 */
	const getUserGrade = ({ grade }: Pick<LoggedClimb, "grade">) => {
		const shouldConvertBoulderGrade =
			VScale.isType(grade) && boulderGradeSystem !== "VSCALE";
		if (shouldConvertBoulderGrade)
			return convertGrade(
				grade,
				GradeScales["VSCALE"],
				GradeScales[boulderGradeSystem]
			);

		const shouldConvertRouteGrade =
			French.isType(grade) && routeGradeSystem !== "FRENCH";
		if (shouldConvertRouteGrade)
			return convertGrade(
				grade,
				GradeScales["FRENCH"],
				GradeScales[routeGradeSystem]
			);

		return grade;
	};

	return {
		getRouteGradeOptions,
		getBoulderGradeOptions,
		getUserGrade,
	};
};
