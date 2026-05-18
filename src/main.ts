import { AppModule } from '@/app.module'
import { ConsoleLogger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

class MyLogger extends ConsoleLogger {
	constructor() {
		super({ timestamp: false })
	}

	protected getTimestamp(): string {
		return ''
	}
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new MyLogger()
	})

	app.use(cookieParser())

	app.enableCors()

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
