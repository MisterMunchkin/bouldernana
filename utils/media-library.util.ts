export type ResizeArgs = {
    original: { height: number; width: number };
    width: number;
};

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
