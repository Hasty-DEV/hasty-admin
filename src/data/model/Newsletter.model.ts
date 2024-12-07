import { z } from 'zod';

export const ListedNewsletterModel = z.object({
  id: z.string().min(1),
  email: z.string(),
  isActive: z.boolean(),
});
export type ListedNewsletterModel = z.infer<typeof ListedNewsletterModel>;
