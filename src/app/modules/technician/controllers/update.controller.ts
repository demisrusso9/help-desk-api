import { Roles } from '@/app/modules/auth/decorator/roles.decorator'
import { JwtAuthGuard } from '@/app/modules/auth/jwt/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import {
	Body,
	Controller,
	NotFoundException,
	Patch,
	UseGuards,
	UsePipes
} from '@nestjs/common'
import { UserNotFoundError } from '../../../shared/errors/user-not-found.error'
import { UpdateAdminDTO, updateAdminSchema } from '../schemas/update.schema'
import { UpdateService } from '../services/update.service'

@Controller('/admin/technicians')
export class UpdateController {
	constructor(private readonly updateService: UpdateService) {}

	@Patch()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ZodValidationPipe(updateAdminSchema))
	@Roles('ADMIN')
	async handle(@Body() body: UpdateAdminDTO) {
		try {
			return await this.updateService.execute(body)
		} catch (error) {
			if (error instanceof UserNotFoundError) {
				throw new NotFoundException(error.message)
			}
		}
	}
}
