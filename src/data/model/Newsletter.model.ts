import { z } from 'zod';

export const ListedNewsletterModel = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
});
export type ListedNewsletterModel = z.infer<typeof ListedNewsletterModel>;
