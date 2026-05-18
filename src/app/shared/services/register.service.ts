import { UserAlreadyExistsError } from '@/app/shared/errors/user-already-exists.error'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../../../database/repository/contracts/users.repository'
import { CreateTechnicianDTO } from '../schema/create-technician.schema'

// const weekDayEnum = z.enum([
// 	'MONDAY',
// 	'TUESDAY',
// 	'WEDNESDAY',
// 	'THURSDAY',
// 	'FRIDAY',
// 	'SATURDAY',
// 	'SUNDAY'
// ])

@Injectable()
export class RegisterService {
	constructor(private readonly userRepository: UsersRepository) {}

	async execute(user: CreateTechnicianDTO) {
		const checkIfUserExists = await this.userRepository.findByEmail(user.email)

		if (checkIfUserExists) {
			throw new UserAlreadyExistsError()
		}

		const hashedPassword = await hash(user.password, 10)

		const createUserPayload = {
			...user,
			password: hashedPassword,
			mustChangePassword: true
		}

		await this.userRepository.createTechnician(createUserPayload)
	}
}
