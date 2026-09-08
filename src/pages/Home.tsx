import { Layout } from '@/components/layout/Layout';
import {
  Hero,
  CapabilityStatement,
  Services,
  Process,
  SelectedWork,
  LogoMarquee,
  Capabilities,
  WhyUs,
  FAQ,
  Founder,
  ProjectCTA,
} from '@/components/sections';

export function Home() {
  return (
    <Layout>
      <Hero />
      <CapabilityStatement />
      <Services />
      <Process />
      <SelectedWork />
      <LogoMarquee />
      <Capabilities />
      <WhyUs />
      <FAQ />
      <Founder />
      <ProjectCTA />
    </Layout>
  );
}
