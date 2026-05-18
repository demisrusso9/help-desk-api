import { z } from 'zod'
import { Role } from '../enum/roles'

export const createTechnicianSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	role: z.enum([Role.TECHNICIAN]).default(Role.TECHNICIAN),
	availabilities: z.array(z.string())
})

export type CreateTechnicianDTO = z.infer<typeof createTechnicianSchema>
