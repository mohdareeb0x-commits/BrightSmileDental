import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ProblemBenefit } from '@/components/ProblemBenefit';
import { WhatsIncluded } from '@/components/WhatsIncluded';
import { SocialProof } from '@/components/SocialProof';
import { LeadForm } from '@/components/LeadForm';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { UTMCapture } from '@/components/UTMCapture';
import { getVariant, getVariantConfig } from '@/lib/variants';

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export const metadata: Metadata = {
  title: 'Free Teeth Whitening Consultation | Bright Smile Dental',
  description: 'Get a brighter smile with a free, no-obligation whitening consultation. 30 minutes, zero pressure, same-week appointments. Book your spot this month.',
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const variant = getVariant(resolvedSearchParams);
  const { headline, ctaText } = getVariantConfig(variant);

  return (
    <>
      <UTMCapture />
      <main className="flex-1">
        <Hero variant={variant} headline={headline} ctaText={ctaText} />
        <ProblemBenefit />
        <WhatsIncluded />
        <SocialProof variant={variant} />
        <LeadForm variant={variant} />
        <FinalCTA variant={variant} ctaText={ctaText} />
      </main>
      <Footer />
    </>
  );
}