import { File, Paths } from "expo-file-system/next";
import { day, DayJsUtils } from "./day-js.util";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { z } from "zod";
import { jsonExportSchema } from "@/constants/zod-schema.const";
import * as FileSystem from "expo-file-system";

export namespace FileSystemUtil {
    export const VIDEOS_DIR = `${FileSystem.documentDirectory}videos/`;
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
                    )} - bouldernana export.json`
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

    /**
     * Import a JSON object from the device's file directory.
     */
    export const importJSON = async (): Promise<
        z.infer<typeof jsonExportSchema> | undefined
    > => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/json",
            });

            if (result.canceled) return;

            const fileResponse = await fetch(result.assets[0].uri);
            const json = (await fileResponse.json()) as z.infer<
                typeof jsonExportSchema
            >;

            const data = jsonExportSchema.parse(json);
            return data;
        } catch (err) {
            console.error(err);
        }
    };
}
