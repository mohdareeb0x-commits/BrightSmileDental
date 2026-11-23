export type Variant = 'a' | 'b';

export interface VariantConfig {
  headline: string;
  ctaText: string;
}

export const VARIANTS: Record<Variant, VariantConfig> = {
  a: {
    headline: 'Free Whitening Consultation — This Month Only',
    ctaText: 'Claim My Free Spot',
  },
  b: {
    headline: "Get the Smile You've Been Putting Off",
    ctaText: 'Book My Free Consultation',
  },
};

export function getVariant(searchParams: { v?: string }): Variant {
  const v = searchParams.v?.toLowerCase();
  if (v === 'a' || v === 'b') return v;
  return 'a';
}

export function getVariantConfig(variant: Variant): VariantConfig {
  return VARIANTS[variant];
}