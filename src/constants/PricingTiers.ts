export interface PricingTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: {
    month: string;
    year: string;
  };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal for individuals who want to get started with simple design tasks.',
    features: [
      '1 workspace',
      'Limited collaboration',
      'Export to PNG and SVG'
    ],
    featured: false,
    priceId: {
      month: 'pri_01hsxyh9txq4rzbrhbyngkhy46',
      year: 'pri_01hsxyh9txq4rzbrhbyngkhy46'
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Enhanced design tools for scaling teams who need more flexibility.',
    features: [
      'Integrations',
      'Unlimited workspaces',
      'Advanced editing tools',
      'Everything in Starter'
    ],
    featured: true,
    priceId: {
      month: 'pri_01hsxycme6m95sejkz7sbz5e9g',
      year: 'pri_01hsxyeb2bmrg618bzwcwvdd6q'
    }
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Powerful tools designed for extensive collaboration and customization.',
    features: [
      'Single sign on (SSO)',
      'Advanced version control',
      'Assets library',
      'Guest accounts',
      'Everything in Pro'
    ],
    featured: false,
    priceId: {
      month: 'pri_01hsxyff091kyc9rjzx7zm6yqh',
      year: 'pri_01hsxyfysbzf90tkh2wqbfxwa5'
    }
  }
];