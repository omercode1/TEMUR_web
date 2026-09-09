import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteUrl = 'https://temurcode.com.tr';
const socialImage = `${siteUrl}/images/temurcode-og.png`;

const pages = {
  '/': {
    title: 'TemurCode | Fikirleri çalışan dijital ürünlere dönüştürüyoruz.',
    description: 'Tasarım, yazılım ve dijital deneyimi tek bir sistemde bir araya getiriyoruz.',
  },
  '/start-project': {
    title: 'Proje Başlat | TemurCode',
    description: 'Fikrinizi, hedeflerinizi ve ihtiyaçlarınızı paylaşın; TemurCode ile projenizi birlikte şekillendirelim.',
  },
} as const;

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

export function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname as keyof typeof pages] ?? pages['/'];
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

    document.title = page.title;
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);

    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', socialImage);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    setMeta('meta[name="twitter:image"]', socialImage);
  }, [pathname]);

  return null;
}
