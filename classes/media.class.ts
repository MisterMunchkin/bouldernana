import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "custom-expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import { NativeVideoThumbnail } from "custom-expo-video-thumbnails";
import { Toast } from "./toast.class";

export type ResizeArgs = {
	original: { height: number; width: number };
	width: number;
};

//NOTE: We should probably change this to an OOP approach.
// new Media().getThumbnail
export class Media {
	videoAssetId: string;
	assetInfo: (MediaLibrary.AssetInfo & { useableUri: string }) | null = null;
	thumbnailRef: NativeVideoThumbnail | null | undefined = null;
	static readonly VIDEO_THUMBNAILS_CACHE_DIR =
		FileSystem.cacheDirectory + "VideoThumbnails/";
	static readonly IMAGE_PICKER_CACHE_DIR =
		FileSystem.cacheDirectory + "ImagePicker/";

	constructor(videoAssetId: string) {
		this.videoAssetId = videoAssetId;
	}

	/**
	 * Retrieves the asset from the videoAssetId, and passes it onto assetInfo
	 *
	 * @returns Media instance for better method chaining
	 */
	public async getAsset(): Promise<Media> {
		try {
			const asset = await MediaLibrary.getAssetInfoAsync(
				this.videoAssetId
			);
			this.assetInfo = {
				...asset,
				useableUri: Media.getUseableUri(asset),
			};
		} catch (error) {
			Media.errorHandler(error, "Failed to get album assets");
			Toast.error();
		} finally {
			return this;
		}
	}

	/**
	 * Retrieves the thumbnail reference and passes it onto thumbnailRef
	 *
	 * @returns Media instance for better method chaining
	 */
	public async getThumbnailRef(): Promise<Media> {
		const { useableUri } =
			this.assetInfo ?? (await this.getAsset()).assetInfo ?? {};

		if (!useableUri) {
			console.error(
				"Failed to get video with assetId: " + this.videoAssetId
			);
			Toast.error({
				description: "Failed to get the video",
			});
			return this;
		}

		try {
			const result = await VideoThumbnails.getNativeThumbnailAsync(
				useableUri,
				{
					quality: 0.3,
				}
			);
			this.thumbnailRef = result;
		} catch (err) {
			Media.errorHandler(err, "Failed to get video thumbnail");
			Toast.error({
				description: "Could not generate a thumbnail for the video",
			});
		} finally {
			return this;
		}
	}

	/**
	 * Cleans up the cache created by different expo packages
	 * for images, and other media
	 */
	public static async cleanCache(): Promise<void> {
		try {
			Promise.all([
				await FileSystem.deleteAsync(Media.IMAGE_PICKER_CACHE_DIR),
			]);
		} catch (err) {
			Media.errorHandler(err, "Error when cleaning cache");
		}
	}

	private static errorHandler = (error: unknown, message: string) => {
		console.error(`MediaLibraryUtil ERR - ${message}`, error);
		console.trace();
	};

	/**
	 * Fix for this issue: https://github.com/expo/expo/issues/31857#issuecomment-2511591063
	 * tl;dr - iOS 18+ has a malformed localUri, something about apple changing things.
	 * This method creates a uri to the assets-library. Not sure exactly why this works
	 */
	private static getUseableUri(assetInfo: MediaLibrary.AssetInfo): string {
		const { uri } = assetInfo ?? {};
		const id = uri?.substring(5, 41); // to get the id of the PH asset
		const assetUri = `assets-library://asset/asset.mp4?id=${id}&ext=mp4`;
		return assetUri;
	}
}

export namespace Media {
	export const resize = ({ original, width }: ResizeArgs) => {
		const aspectRatio = original.width / original.height;
		const height = width / aspectRatio;

		return {
			width,
			height,
			aspectRatio,
		};
	};
	export const ensurePermissions = async (): Promise<boolean> => {
		const { status, accessPrivileges } =
			await MediaLibrary.requestPermissionsAsync();

		if (accessPrivileges === "limited") {
			Toast.info({
				message: "Limited access to media library",
				description:
					"You can update the videos you would like bouldernana to access in your phone's settings.",
				autoClose: false,
			});
		}

		return status === "granted";
	};
}
