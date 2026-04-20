import WaterlineHero from '@/components/ui/WaterlineHero'
import FilmStrip from '@/components/portfolio/FilmStrip'
import CrossingSection from '@/components/ui/CrossingSection'
import PrintsShowcase from '@/components/prints/PrintsShowcase'
import ViewingRoomTeaser from '@/components/prints/ViewingRoomTeaser'
import AboutSection from '@/components/ui/AboutSection'

export default function Home() {
  return (
    <>
      <WaterlineHero />
      <FilmStrip />
      <CrossingSection />
      <div className="bg-deep">
        <PrintsShowcase />
        <ViewingRoomTeaser />
      </div>
      <AboutSection />
    </>
  )
}
