import z from 'zod'
import { Role } from '../enum/roles'

export const userSchema = z.object({
	id: z.string(),
	name: z.string().min(4),
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	role: z.enum(Role),
	profileImageUrl: z.url('Invalid URL').optional(),
	mustChangePassword: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date().nullish(),
	availabilities: z.array(z.string())
})

export type UserDTO = z.infer<typeof userSchema>
export type UserCredentialsDTO = Pick<UserDTO, 'id' | 'password' | 'role'>
