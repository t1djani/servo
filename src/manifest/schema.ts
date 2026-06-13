import { z } from "zod";

export const ExpertSchema = z.object({
  sources: z.array(z.string()).min(1),
  ownsCheck: z.array(z.string()).default([]),
});

export const ManifestSchema = z.object({
  experts: z.record(z.string(), ExpertSchema).default({}),
  oracles: z.record(z.string(), z.string()).default({}),
});

export type Expert = z.infer<typeof ExpertSchema>;
export type Manifest = z.infer<typeof ManifestSchema>;
