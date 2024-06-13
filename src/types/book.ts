import { z} from 'zod';

// Define the schema using Zod
export const CreateBookTypeSchema = z.object({
    title: z.string(),
    author: z.string(),
    borrow_date: z.date().nullable().optional(),
    borrow_status: z.string().optional(),
    id: z.string().optional()
    // Define other properties if needed
}).strict()

// Type alias for the schema type
export type CreateBookType = z.infer<typeof CreateBookTypeSchema>;