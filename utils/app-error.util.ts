export class AppError<T extends object> extends Error {
	constructor(message: string, cause: T) {
		super(message);
		this.name = "AppError";
		this.cause = cause;
	}

	static isAppError<T extends Object>(err: unknown): err is AppError<T> {
		return err instanceof AppError;
	}
}
