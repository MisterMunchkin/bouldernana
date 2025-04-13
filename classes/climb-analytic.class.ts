import { COLORS } from "@/constants/colors.const";

type PieChartType = {
	name: string;
	value: number;
	color: string;
	legendFontColor: string;
	legendFontSize: number;
};

type ConstructorProps<T extends object> = {
	data: T[];
};
export class Analytics<T extends object> {
	data: T[] = [];

	private colors: string[] = [
		COLORS.core["caribbean-current"].DEFAULT,
		COLORS.core["nyanza"][400],
		COLORS.core["vanilla"][400],
		COLORS.core["imperial-red"][700],
	];

	constructor({ data }: ConstructorProps<T>) {
		this.data = data;
	}

	toPieChartData<TAccessor extends keyof T>(accessor: TAccessor) {
		const acc: Record<string, number> = {};
		this.data.forEach((item) => {
			const key = item[accessor] as string;
			acc[key] = (acc[key] || 0) + 1;
		});

		const result: PieChartType[] = Object.entries(acc).map(
			([name, value], index) => ({
				name,
				value,
				color: this.colors[index % this.colors.length],
				legendFontColor: "#7F7F7F",
				legendFontSize: 15,
			})
		);

		return result;
	}
}
