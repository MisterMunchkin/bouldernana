import { useFormContext, useWatch } from "react-hook-form";
import DropdownField from "@/components/core/dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { ClimbTypeEnum } from "@/constants/zod-schema.const";
import { ClimbSchema } from "@/components/forms/climb-log-form";

type Props = {};

const ClimbTypeGrade = ({}: Props) => {
	const { getBoulderGradeOptions, getRouteGradeOptions } =
		useUserGradeOptions();

	const { control } = useFormContext<ClimbSchema>();
	const typeOfClimb = useWatch({
		control,
		name: "typeOfClimb",
	});

	return (
		<>
			<DropdownField
				control={control}
				name="typeOfClimb"
				title="What did you climb?"
				items={CoreTypesUtil.getInferredDropdownItems(
					ClimbTypeEnum.options
				)}
				classNames={{
					selected: "bg-core-amethyst-smoke-600",
				}}
			/>
			<DropdownField
				control={control}
				name="grade"
				title={`${typeOfClimb} Grade`}
				items={
					typeOfClimb === "Board" || typeOfClimb === "Boulder"
						? getBoulderGradeOptions()
						: getRouteGradeOptions()
				}
				classNames={{
					selected: "bg-core-amethyst-smoke-600",
				}}
				placeholder="Select a grade..."
			/>
		</>
	);
};

export default ClimbTypeGrade;
