export const SITE = {
  name: 'TEMUR',
  tag: 'STUDIO',
  title: 'TEMUR STUDIO',
} as const;

export const NAV_LINKS = [
  { name: 'Hizmetler', href: '#services' },
  { name: 'Projeler', href: '#work' },
  { name: 'Süreç', href: '#process' },
  { name: 'Hakkımızda', href: '#founder' },
] as const;

export type FooterLink = {
  label: string;
  href: string;
};

// Add verified public profiles here when they are ready to be published.
export const SOCIAL_LINKS: FooterLink[] = [];

// Add the published privacy and terms pages here after their legal content is approved.
export const LEGAL_LINKS: FooterLink[] = [];
