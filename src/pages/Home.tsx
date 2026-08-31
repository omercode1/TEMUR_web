import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { CapabilityStatement } from '../components/sections/CapabilityStatement';
import { Services } from '../components/sections/Services';
import { Process } from '../components/sections/Process';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Capabilities } from '../components/sections/Capabilities';
import { WhyUs } from '../components/sections/WhyUs';
import { FAQ } from '../components/sections/FAQ';
import { ProjectCTA } from '../components/sections/ProjectCTA';

export function Home() {
  return (
    <Layout>
      <Hero />
      <CapabilityStatement />
      <Services />
      <Process />
      <SelectedWork />
      <Capabilities />
      <WhyUs />
      <FAQ />
      <ProjectCTA />
    </Layout>
  );
}
