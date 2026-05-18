import { Envs } from '@/config/env'
import { UsersRepository } from '@/database/repository/contracts/users.repository'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../../../shared/errors/invalid-credentials.error'
import { SignInUserDTO } from '../schemas/sign-in-user.schema'

@Injectable()
export class AuthenticateService {
	constructor(
		private configService: ConfigService<Envs, true>,
		private userRepository: UsersRepository,
		private jwtService: JwtService
	) {}

	async execute(user: SignInUserDTO) {
		const checkIfUserExists = await this.userRepository.findByEmail(user.email)

		if (!checkIfUserExists) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatch = await compare(user.password, checkIfUserExists.password)

		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError()
		}

		const accessToken = this.jwtService.sign(
			{ sub: checkIfUserExists.id, role: checkIfUserExists.role },
			{ expiresIn: this.configService.get('JWT_EXPIRES_IN') }
		)

		return {
			accessToken,
			user: {
				id: checkIfUserExists.id,
				name: checkIfUserExists.name,
				email: checkIfUserExists.email,
				role: checkIfUserExists.role
			}
		}
	}
}
