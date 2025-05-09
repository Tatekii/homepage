import { BackgroundEffects } from '@/components/background-effects';
import { SinglePageContent } from '@/components/single-page-content';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundEffects />
      <SinglePageContent />
    </div>
  );
}