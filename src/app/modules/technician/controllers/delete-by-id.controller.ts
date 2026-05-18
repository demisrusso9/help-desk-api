import { Roles } from '@/app/modules/auth/decorator/roles.decorator'
import { JwtAuthGuard } from '@/app/modules/auth/jwt/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import {
	Controller,
	Delete,
	NotFoundException,
	Query,
	UseGuards,
	UsePipes
} from '@nestjs/common'

import { UserNotFoundError } from '../../../shared/errors/user-not-found.error'
import { ParamIdDTO, paramIdSchema } from '../schemas/param-id.schema'
import { DeleteByIdService } from '../services/delete-by-id.service'

@Controller('/admin/technicians')
export class DeleteByIdController {
	constructor(private readonly deleteByIdService: DeleteByIdService) {}

	@Delete()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ZodValidationPipe(paramIdSchema))
	@Roles('ADMIN')
	async handle(@Query('id') id: ParamIdDTO) {
		try {
			return await this.deleteByIdService.execute(id)
		} catch (error) {
			if (error instanceof UserNotFoundError) {
				throw new NotFoundException(error.message)
			}
		}
	}
}
