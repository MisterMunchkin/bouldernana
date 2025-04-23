import { toast, Toaster } from "sonner-native";

export class Toast {
	public success(): void {}

	public static error(options?: {
		description?: string;
		message?: string;
	}): void {
		const { description, message } = options ?? {};
		toast.error(message ?? "Something went wrong", {
			description,
			position: "top-center",
		});
	}

	public static info(options?: {
		description?: string;
		message?: string;
	}): string | number {
		const { description, message } = options ?? {};

		return toast.info(message ?? "Info", {
			description,
			position: "top-center",
		});
	}
}
