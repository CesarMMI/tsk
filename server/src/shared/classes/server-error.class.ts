import { HttpException } from '@nestjs/common';

export class ServerError extends HttpException {
	constructor(
		public statusCode: number,
		public message: string
	) {
		super(message, statusCode);
	}
}
