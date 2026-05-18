import { UpdateAdminDTO } from '@/app/modules/technician/schemas/update.schema'
import { CreateClientDTO } from '@/app/shared/schema/create-client.schema'
import { CreateTechnicianDTO } from '@/app/shared/schema/create-technician.schema'
import { UserCredentialsDTO, UserDTO } from '@/app/shared/schema/user.schema'
import { PrismaService } from '@/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { Role } from 'prisma/generated/enums'
import { UsersRepository } from './contracts/users.repository'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
	constructor(private prisma: PrismaService) {}

	async createClient(user: CreateClientDTO): Promise<UserDTO> {
		const createdUser = await this.prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				role: user.role
			},
			omit: { password: true }
		})

		return createdUser as UserDTO
	}

	async createTechnician(
		user: CreateTechnicianDTO & { mustChangePassword: boolean }
	): Promise<UserDTO> {
		const createdUser = await this.prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				role: user.role,
				mustChangePassword: user.mustChangePassword,
				availabilities: user.availabilities
			},
			omit: { password: true }
		})

		return createdUser as UserDTO
	}

	async findById(id: string): Promise<UserDTO | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			omit: { password: true }
		})

		return user as UserDTO
	}

	async findByEmail(email: string): Promise<UserDTO | null> {
		const user = await this.prisma.user.findUnique({
			where: { email }
		})

		return user as UserDTO
	}

	async findCredentialsByEmail(email: string): Promise<UserCredentialsDTO | null> {
		const user = await this.prisma.user.findUnique({
			where: { email },
			select: { id: true, password: true, role: true }
		})

		return user as UserCredentialsDTO
	}

	async findAll(): Promise<UserDTO[] | []> {
		const users = await this.prisma.user.findMany({
			where: { role: Role.TECHNICIAN }
		})

		return users as UserDTO[]
	}

	async deleteById(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id }
		})
	}

	async update(user: UpdateAdminDTO): Promise<void> {
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				name: user.name,
				password: user.password,
				profileImageUrl: user.profileImageUrl,
				availabilities: user.availabilities,
				updatedAt: new Date()
			}
		})
	}
}
