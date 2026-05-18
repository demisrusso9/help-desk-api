import { Roles } from '@/app/modules/auth/decorator/roles.decorator'
import { JwtAuthGuard } from '@/app/modules/auth/jwt/jwt-auth.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ListService } from '../services/list.service'

@Controller('/admin/technicians')
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	async handle() {
		return await this.listService.execute()
	}
}
