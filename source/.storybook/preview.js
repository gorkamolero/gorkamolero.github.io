// Raw HTML slots in source-faithful examples use these components' shared styles.
import '../src/components/ActionRow.astro';
import '../src/components/ArchiveTable.astro';
import '../src/components/AudioEmbed.astro';
import '../src/components/Carousel.astro';
import '../src/components/CaseLead.astro';
import '../src/components/Dot.astro';
import '../src/components/FactsList.astro';
import '../src/components/Figure.astro';
import '../src/components/Footer.astro';
import '../src/components/GitHubLink.astro';
import '../src/components/GroupHeading.astro';
import '../src/components/IntroNotes.astro';
import '../src/components/Job.astro';
import '../src/components/Masthead.astro';
import '../src/components/MetaLine.astro';
import '../src/components/Narration.astro';
import '../src/components/PointsList.astro';
import '../src/components/PortfoliosMenu.astro';
import '../src/components/ProjectIndex.astro';
import '../src/components/Release.astro';
import '../src/components/TextLink.astro';
import '../src/components/WorkSection.astro';
import '../src/styles/global.css';
import PageFrame from '../src/components/PageFrame.astro';
export default {
  decorators: [() => ({component: PageFrame})],
  parameters: {layout: 'fullscreen', viewport: {options: {phone: {name: 'Phone', styles: {width: '390px', height: '844px'}}}}},
  beforeEach: async ({parameters}) => {
    document.body.dataset.page = parameters.page || 'anima';
  },
};
