import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");

export const day = dayjs;
day.extend(localizedFormat);

export namespace DayJsUtils {
    /**Thu, Aug 16, 2018 8:02 PM */
    export const DEFAULT_FORMAT = "llll";
}
