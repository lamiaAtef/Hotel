import Houses from '../components/Houses'
import Hotels from '../components/Hotels'
import RoomExplore from '../components/RoomExplore'
import AdsData from '../components/AdsData'
import AdsSlider from '../components/AdsSlider'
import Reviews from '../components/Reviews'

export default function Home() {
  return (
    <>
      <RoomExplore/>
      <Houses/>
      <Hotels/>
      <AdsData/>
      <AdsSlider/>
      <Reviews/>
    </>
  )
}
