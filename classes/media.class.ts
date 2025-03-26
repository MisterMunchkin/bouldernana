import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { NativeVideoThumbnail } from "expo-video-thumbnails";
import { Toast } from "./toast.class";

export type ResizeArgs = {
	original: { height: number; width: number };
	width: number;
};

//NOTE: We should probably change this to an OOP approach.
// new Media().getThumbnail
export class Media {
	videoAssetId: string;
	assetInfo: MediaLibrary.AssetInfo | null = null;
	thumbnailRef: NativeVideoThumbnail | null = null;

	constructor(videoAssetId: string) {
		this.videoAssetId = videoAssetId;
	}

	public async getAsset(): Promise<Media> {
		try {
			const asset = await MediaLibrary.getAssetInfoAsync(
				this.videoAssetId
			);
			this.assetInfo = asset;
		} catch (error) {
			Media.errorHandler(error, "Failed to get album assets");
			Toast.error();
		} finally {
			return this;
		}
	}

	public async getThumbnailRef(): Promise<Media> {
		const { localUri } =
			this.assetInfo ?? (await this.getAsset()).assetInfo ?? {};

		if (!localUri) {
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
				localUri,
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

	private static errorHandler = (error: unknown, message: string) => {
		console.error(`MediaLibraryUtil ERR - ${message}`, error);
		console.trace();
	};
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
		const { status } = await MediaLibrary.requestPermissionsAsync();
		return status === "granted";
	};
}
