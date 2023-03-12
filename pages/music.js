import MusicListItem from "../components/MusicListItem";
import MyLink from "../components/MyLink";
import LayoutPage from "../layouts/LayoutPage";

const pageMeta = {
  title: "tidemann.xyz",
  keywords:
    "music technology, music, software development, networked audio, programming",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function Music() {
  return (
    <LayoutPage pageMeta={pageMeta}>
      <div className="flex flex-col space-y-12">
        <MusicListItem
          title="The Holy Mountain"
          summary="A trio with accordion, synthesizer, drums, and vocals. We play hypnotic, dark and atmospheric music."
          genre="avant-garde pop"
          role="drums and synthesizer"
          type="band"
          pageUrl="https://theholymountain.net"
          musicUrl="https://open.spotify.com/artist/04GXo6z6x1KLMG9weDPayK?si=5wuVoAz1SqqsndsFbkKmYQ"
        />
        <MusicListItem
          title="Karwowski, Kann & Tidemann"
          summary="A quartet that creates contemplative concert experiences through unique audio-visual improvisation. Henrik Nordahl is the visual artist."
          genre="improvisation"
          role="live electronics"
          type="band"
          pageUrl="https://www.facebook.com/karwowskikanntidemann"
          musicUrl="https://vimeo.com/karwowskikanntidemann"
        />
        <MusicListItem
          title="Radio 9"
          summary="From subtle, mellifluous atmospherics to harsh post-punk whiteouts. This is Radio 9. Straight down the Autobahn."
          genre="Krautrock"
          role="drums"
          type="band"
          pageUrl="https://www.facebook.com/radio9"
          musicUrl="https://radio9.bandcamp.com"
        />
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
