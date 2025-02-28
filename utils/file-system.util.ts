import { File, Paths } from "expo-file-system/next";
import { day, DayJsUtils } from "./day-js.util";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { z } from "zod";
import { jsonExportSchema } from "@/constants/zod-schema.const";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import uuid from "react-native-uuid";

export class FileSystemUtil {
    private static readonly INIT_FOLDER_PROFILE =
        "FileSystemUtil.initFileFolder";
    private static readonly SAVE_VIDEO_PROFILE = "FileSystemUtil.saveVideo";
    private static readonly DELETE_VIDEO_PROFILE = "FileSystemUtil.deleteVideo";
    private static readonly HAS_ENOUGH_STORAGE =
        "FileSystemUtil.hasEnoughStorage";

    /**
     * Initialize the file system folder for videos
     */
    public static async initFileFolder(): Promise<void> {
        try {
            const info = await FileSystem.getInfoAsync(this.VIDEOS_DIR);

            if (info.exists) return Promise.resolve();

            await FileSystem.makeDirectoryAsync(this.VIDEOS_DIR, {
                intermediates: true,
            });
        } catch (err) {
            console.error(`${this.INIT_FOLDER_PROFILE}: `, err);
        }
    }

    /**
     * Save a video to the device's file system using expo-file-system.
     **/
    public static async saveVideo({
        uri,
        fileName,
        fileSize,
    }: Pick<
        ImagePickerAsset,
        "uri" | "fileName" | "fileSize"
    >): Promise<string> {
        const hasEnoughStorage =
            !!fileSize && (await this.hasEnoughStorage(fileSize));
        if (!hasEnoughStorage)
            Promise.reject(
                `Not enough storage on device fileSize: ${fileSize}`
            );

        try {
            const fileExt = fileName?.split(".").pop();
            const newUri = `${this.VIDEOS_DIR}${uuid.v4()}.${fileExt}`;
            await FileSystem.copyAsync({ from: uri, to: newUri });

            console.info(
                `${this.SAVE_VIDEO_PROFILE}: Video saved to ${newUri}`
            );
            return newUri;
        } catch (err) {
            console.error(`${this.SAVE_VIDEO_PROFILE}: `, err);
            return "";
        }
    }

    public static async deleteVideo(uri: string | string[]): Promise<void> {
        if (!uri || uri.length === 0) return;

        try {
            if (Array.isArray(uri)) {
                await Promise.all(uri.map((u) => FileSystem.deleteAsync(u)));
                console.info(
                    `${this.DELETE_VIDEO_PROFILE}: Videos deleted from ${uri}`
                );
                return;
            }

            await FileSystem.deleteAsync(uri);
            console.info(
                `${this.DELETE_VIDEO_PROFILE}: Video deleted from ${uri}`
            );
        } catch (err) {
            console.error(`${this.DELETE_VIDEO_PROFILE}`, err);
        }
    }

    private static async hasEnoughStorage(fileSize: number): Promise<boolean> {
        try {
            const freeStorageInBytes =
                await FileSystem.getFreeDiskStorageAsync();

            return fileSize < freeStorageInBytes;
        } catch (err) {
            console.error(this.HAS_ENOUGH_STORAGE, err);
            return false;
        }
    }

    public static async test() {
        const dir = await FileSystem.readDirectoryAsync(this.VIDEOS_DIR);
        dir.forEach((file) => console.log(file));
    }
}

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
