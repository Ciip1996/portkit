import { Redis } from "@upstash/redis";
import { BUILTIN_VARIANTS, type VariantConfig, type SectionId } from "./variants";

const KV_PREFIX = "variant:";
const KV_INDEX = "variant:_index";
const KV_GENERAL_OVERRIDE = "variant:general-override";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getVariant(
  slug: string,
): Promise<VariantConfig | null> {
  if (slug in BUILTIN_VARIANTS) return BUILTIN_VARIANTS[slug];

  const redis = getRedis();
  if (!redis) return null;

  try {
    const config = await redis.get<VariantConfig>(`${KV_PREFIX}${slug}`);
    return config ?? null;
  } catch {
    return null;
  }
}

export async function listCustomVariants(): Promise<VariantConfig[]> {
  const redis = getRedis();
  if (!redis) return [];

  try {
    const slugs = await redis.get<string[]>(KV_INDEX);
    if (!slugs || slugs.length === 0) return [];

    const configs = await Promise.all(
      slugs.map((s) => redis.get<VariantConfig>(`${KV_PREFIX}${s}`)),
    );
    return configs.filter(Boolean) as VariantConfig[];
  } catch {
    return [];
  }
}

export async function saveVariant(config: VariantConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  await redis.set(`${KV_PREFIX}${config.slug}`, config);

  const slugs = (await redis.get<string[]>(KV_INDEX)) ?? [];
  if (!slugs.includes(config.slug)) {
    slugs.push(config.slug);
    await redis.set(KV_INDEX, slugs);
  }
}

export async function getGeneralSections(): Promise<SectionId[]> {
  const redis = getRedis();
  if (!redis) return BUILTIN_VARIANTS.general.sections;

  try {
    const override = await redis.get<SectionId[]>(KV_GENERAL_OVERRIDE);
    return override ?? BUILTIN_VARIANTS.general.sections;
  } catch {
    return BUILTIN_VARIANTS.general.sections;
  }
}

export async function saveGeneralSections(sections: SectionId[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  await redis.set(KV_GENERAL_OVERRIDE, sections);
}

export async function deleteVariant(slug: string): Promise<void> {
  if (slug in BUILTIN_VARIANTS) return;

  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  await redis.del(`${KV_PREFIX}${slug}`);

  const slugs = (await redis.get<string[]>(KV_INDEX)) ?? [];
  const updated = slugs.filter((s) => s !== slug);
  await redis.set(KV_INDEX, updated);
}
