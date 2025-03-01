import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { VideoThumbnailsResult } from "expo-video-thumbnails";

export type ResizeArgs = {
    original: { height: number; width: number };
    width: number;
};

//NOTE: We should probably change this to an OOP approach.
// new Media().getThumbnail
export class MediaLibraryUtil {
    static readonly ALBUM_NAME = "Bouldernana";
    private static async ensurePermissions(): Promise<boolean> {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === "granted";
    }

    private static errorHandler(error: unknown, message: string) {
        console.error(`MediaLibraryUtil ERR - ${message}`, error);
        console.trace();
    }

    /**
     * Creates the app's dedicated album if it doesn't exist
     */
    public static async ensureAlbumExists(): Promise<MediaLibrary.Album | null> {
        const hasPermissions = await this.ensurePermissions();
        if (!hasPermissions) return null;

        // Check if album already exists
        const albums = await MediaLibrary.getAlbumsAsync();
        const existingAlbum = albums.find(
            (album) => album.title === MediaLibraryUtil.ALBUM_NAME
        );

        if (existingAlbum) {
            return existingAlbum;
        }

        // Create album if it doesn't exist
        try {
            const album = await MediaLibrary.createAlbumAsync(
                MediaLibraryUtil.ALBUM_NAME,
                undefined //TODO: Will be required on Android
            );
            return album;
        } catch (error) {
            this.errorHandler(error, "Failed to create album");
            return null;
        }
    }

    /**
     * Gets asset information from the app's album
     */
    public static async getAlbumAssets(): Promise<MediaLibrary.Asset[]> {
        const album = await this.ensureAlbumExists();
        if (!album) return [];

        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                album: album.id,
                mediaType: [MediaLibrary.MediaType.video],
                sortBy: [MediaLibrary.SortBy.creationTime],
            });

            return assets;
        } catch (error) {
            this.errorHandler(error, "Failed to get album assets");
            return [];
        }
    }

    /**
     * Gets a specific asset by ID
     */
    public static async getAssetById(
        assetId: string
    ): Promise<MediaLibrary.AssetInfo | null> {
        try {
            const asset = await MediaLibrary.getAssetInfoAsync(assetId);
            return asset;
        } catch (error) {
            this.errorHandler(error, "Failed to get album assets");
            return null;
        }
    }

    public static async getThumbnail(
        assetId: string
    ): Promise<VideoThumbnailsResult | null> {
        const { localUri } = (await this.getAssetById(assetId)) ?? {};
        if (!localUri) {
            console.error("Failed to get video with assetId: " + assetId);
            return null;
        }

        try {
            const result = await VideoThumbnails.getThumbnailAsync(localUri);

            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public static async getPlayableVideoUri(
        assetId: string
    ): Promise<string | undefined> {
        const { localUri } = (await this.getAssetById(assetId)) ?? {};
        if (!localUri) {
            console.error("Failed to get video with assetId: " + assetId);
            return;
        }
        try {
            const { localUri } = (await this.getAssetById(assetId)) ?? {};
            return localUri;
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

export namespace MediaLibraryUtil {
    export const resize = ({ original, width }: ResizeArgs) => {
        const aspectRatio = original.width / original.height;
        const height = width / aspectRatio;

        return {
            width,
            height,
            aspectRatio,
        };
    };
}
