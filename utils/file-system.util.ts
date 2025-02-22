import { File, Paths } from "expo-file-system/next";
import { day, DayJsUtils } from "./day-js.util";
import * as Sharing from "expo-sharing";

export namespace FileSystemUtil {
    /**
     * Save a JSON object to the device's cache directory.
     * @param data The JSON object to save.
     * @param fileName The name of the file to save. If not provided, a default name will be generated based on the current date and time.
     */
    export const saveJSON = async ({
        data,
        fileName,
    }: {
        data: string;
        fileName?: string;
    }) => {
        try {
            const file = new File(
                Paths.cache,
                fileName ??
                    `${day().format(
                        DayJsUtils.DEFAULT_FORMAT
                    )} - bouldernana JSON export`
            );
            file.create();
            file.write(data);

            const canShare = await Sharing.isAvailableAsync();
            if (!canShare) return;

            await Sharing.shareAsync(file.uri);
        } catch (err) {
            console.error(err);
        }
    };
}
