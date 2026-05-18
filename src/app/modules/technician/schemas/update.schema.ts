import { z } from 'zod'

export const updateAdminSchema = z.object({
	id: z.string(),
	name: z.string().min(4).optional(),
	password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
	role: z.string().default('admin').optional(),
	profileImageUrl: z.url('Invalid URL').optional(),
	availabilities: z.array(z.string()).optional()
})

export type UpdateAdminDTO = z.infer<typeof updateAdminSchema>
