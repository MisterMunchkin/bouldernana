import dayjs, { Dayjs } from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");

export type StrictFormat =
	| "YYYY-MM-DDTHH:mm:ssZ"
	| "YYYY-MM-DD"
	| "DD MMM, YYYY";

export const day = dayjs;
day.extend(localizedFormat);
declare module "dayjs" {
	export interface Dayjs {
		strictFormat(format: StrictFormat): string;
	}
}

day.extend((option, day) => {
	day.prototype.strictFormat = function (format: StrictFormat): string {
		return this.format(format);
	};
});

export namespace DayJsUtils {
	/**Thu, Aug 16, 2018 8:02 PM */
	export const DEFAULT_FORMAT = "llll";
	export const getWeekRange = (date: Dayjs): string => {
		const startOfWeek = day(date).startOf("week");
		const endOfWeek = day(date).endOf("week");
		return `${startOfWeek.format("MMMM D")} - ${endOfWeek.format(
			"MMMM D"
		)}`;
	};
	/**
	 * Gets the month labels from this month until 'from' month.
	 *
	 * from - the number of month labels started from the current month
	 */
	export const getMonthLabelsFrom = (from: number) =>
		Array.from({ length: 3 }, (_, i) => {
			return day().subtract(i, "month").format("MMMM");
		});
	export const getFirstDayOfEachMonthFrom = (monthsAgo: number) => {
		const dates = [];
		for (let i = monthsAgo - 1; i >= 0; i--) {
			dates.push(day().subtract(i, "month").startOf("month"));
		}
		return dates;
	};
}
