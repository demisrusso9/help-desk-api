import {
	CreateTechnicianDTO,
	createTechnicianSchema
} from '@/app/shared/schema/create-technician.schema'
import { RegisterService } from '@/app/shared/services/register.service'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import {
	Body,
	ConflictException,
	Controller,
	Post,
	UseGuards,
	UsePipes
} from '@nestjs/common'
import { UserAlreadyExistsError } from '../../../shared/errors/user-already-exists.error'
import { Roles } from '../../auth/decorator/roles.decorator'
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard'

@Controller('/admin/technicians')
export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createTechnicianSchema))
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	async handle(@Body() body: CreateTechnicianDTO) {
		try {
			return await this.registerService.execute(body)
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				throw new ConflictException(error.message)
			}
		}
	}
}
