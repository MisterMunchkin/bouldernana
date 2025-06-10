import { AddClimbSchema } from "@/app/(tabs)/new-climb";
import { useFormContext, useWatch } from "react-hook-form";
import DropdownField from "@/components/core/dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { ClassValue } from "clsx";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { ClimbTypeEnum } from "@/constants/zod-schema.const";

type Props = {};

const ClimbTypeGrade = ({}: Props) => {
	const { getBoulderGradeOptions, getRouteGradeOptions } =
		useUserGradeOptions();

	const { control } = useFormContext<AddClimbSchema>();
	const typeOfClimb = useWatch({
		control,
		name: "typeOfClimb",
	});
	const selected: ClassValue = "bg-red-500";

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
					selected,
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
					selected,
				}}
				placeholder="Select a grade..."
			/>
		</>
	);
};

export default ClimbTypeGrade;
