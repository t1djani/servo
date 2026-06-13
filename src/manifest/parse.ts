import { parse as parseYaml } from "yaml";
import { ManifestSchema, type Manifest } from "./schema.js";

export type ParseResult =
  | { ok: true; manifest: Manifest }
  | { ok: false; errors: string[] };

export function parseManifest(yamlText: string): ParseResult {
  let raw: unknown;
  try {
    raw = parseYaml(yamlText);
  } catch (e) {
    return { ok: false, errors: [`YAML parse error: ${(e as Error).message}`] };
  }
  const result = ManifestSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    };
  }
  return { ok: true, manifest: result.data };
}
