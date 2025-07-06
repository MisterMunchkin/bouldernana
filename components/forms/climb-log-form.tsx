import { climbSchema } from "@/constants/zod-schema.const";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { day } from "@/utils/day-js.util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";
import VideoField from "@/components/video/video-field";
import { TextField } from "@/components/core/field";
import ClimbTypeGrade from "@/components/log-new-climb/climb-type-grade";
import DropdownField from "@/components/core/dropdown-field";
import {
	CLIMB_FEEL,
	SKILL_TYPE,
	STEEPNESS,
	WHERE,
} from "@/constants/core.const";
import { AscentField } from "@/components/log-new-climb/ascent-field";
import DateTimeField from "@/components/core/date-time-field";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";
import { ClassValue } from "clsx";

export type ClimbSchema = z.infer<typeof climbSchema>;

const DEFAULT_VALUES: ClimbSchema = {
	name: "",
	videoAssetIds: [],
	typeOfClimb: "Boulder",
	whereDidYouClimb: "Indoor",
	grade: "",
	ascentType: "Flash",
	hasBeenSent: true,
	attempts: 1,
	howDidItFeel: "Solid",
	skill: [],
	steepness: "Overhang",
	// rating: "",
	date: day().toISOString(),
	notes: "",
	// relativeEffort: ""
};

type Props = {
	onSubmit: SubmitHandler<ClimbSchema>;
	onError?: SubmitErrorHandler<ClimbSchema>;
	defaultValues?: ClimbSchema;
};

const ClimbLogForm = ({
	onError,
	onSubmit: onSubmitProp,
	defaultValues = DEFAULT_VALUES,
}: Props) => {
	const form = useForm({
		resolver: zodResolver(climbSchema),
		defaultValues,
	});
	const { control, handleSubmit, reset } = form;
	const getInferredDropdownItems = CoreTypesUtil.getInferredDropdownItems;

	const onSubmit = (data: ClimbSchema) => {
		reset();
		onSubmitProp(data);
	};

	const selected: ClassValue = "bg-core-amethyst-smoke-600";
	return (
		<KeyboardAwareScrollView className="px-4">
			<View className="gap-8 flex-grow py-safe-offset-20">
				<FormProvider {...form}>
					{/* TODO: Hide inside subscriber toggle */}
					<VideoField control={control} name="videoAssetIds" />
					<TextField
						control={control}
						name="name"
						title="Name of the climb"
					/>

					<ClimbTypeGrade />
					<DropdownField
						control={control}
						name="whereDidYouClimb"
						title="Where did you climb?"
						items={getInferredDropdownItems(WHERE)}
						classNames={{
							selected,
						}}
					/>

					<AscentField />

					<DropdownField
						control={control}
						name="howDidItFeel"
						title="How did the climb feel?"
						items={getInferredDropdownItems(CLIMB_FEEL)}
						classNames={{
							selected,
						}}
					/>

					<DropdownField
						control={control}
						name="skill"
						title="What skill is needed for this climb?"
						items={getInferredDropdownItems(SKILL_TYPE)}
						classNames={{
							selected,
						}}
						multi
					/>
					<DropdownField
						control={control}
						name="steepness"
						title="How steep was this climb?"
						items={getInferredDropdownItems(STEEPNESS)}
						classNames={{
							selected,
						}}
					/>

					<DateTimeField title="Date" control={control} name="date" />

					<TextField
						control={control}
						name="notes"
						title="Notes of the climb."
						className="h-32"
						inputProps={{ multiline: true, numberOfLines: 5 }}
					/>

					<TextField
						control={control}
						name="link"
						title="Links or resources of the climb, like TheCrag links"
					/>

					<PressableOpacity
						onPress={handleSubmit(onSubmit, onError)}
						color={"submit"}
						rounded={"lg"}
					>
						<AppText size={"xs"}>Submit</AppText>
					</PressableOpacity>
				</FormProvider>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default ClimbLogForm;
