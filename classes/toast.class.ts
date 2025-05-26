import { toast, Toaster } from "sonner-native";

type ToastOptions = {
	description?: string;
	message?: string;
	autoClose?: boolean;
};

export class Toast {
	public static success(options?: ToastOptions): void {
		const { message, description, autoClose = true } = options ?? {};

		toast.success(message ?? "Success", {
			description,
			position: "top-center",
			duration: autoClose ? 4000 : 100000,
		});
	}

	public static error(options?: ToastOptions): void {
		const { description, message } = options ?? {};
		toast.error(message ?? "Something went wrong", {
			description,
			position: "top-center",
		});
	}

	public static info(options?: ToastOptions): string | number {
		const { description, message, autoClose = true } = options ?? {};

		return toast.info(message ?? "Info", {
			description,
			position: "top-center",
			duration: autoClose ? 4000 : 100000,
		});
	}
}
