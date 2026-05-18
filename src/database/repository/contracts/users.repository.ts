import { UpdateAdminDTO } from '@/app/modules/technician/schemas/update.schema'
import { CreateClientDTO } from '@/app/shared/schema/create-client.schema'
import { CreateTechnicianDTO } from '@/app/shared/schema/create-technician.schema'
import { UserCredentialsDTO, UserDTO } from '@/app/shared/schema/user.schema'

export abstract class UsersRepository {
	abstract createTechnician(user: CreateTechnicianDTO): Promise<UserDTO>
	abstract createClient(user: CreateClientDTO): Promise<UserDTO>
	abstract findByEmail(email: string): Promise<UserDTO | null>
	abstract findCredentialsByEmail(email: string): Promise<UserCredentialsDTO | null>
	abstract findById(id: string): Promise<UserDTO | null>
	abstract findAll(): Promise<UserDTO[] | []>
	abstract deleteById(id: string): Promise<void>
	abstract update(user: UpdateAdminDTO): Promise<void>
}
