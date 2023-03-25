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
          summary="THM (The Holy Mountain) is a captivating avant-garde pop trio hailing from Oslo. The band blends accordion, synthesizer, drums, and vocals to create hypnotic, atmospheric compositions that exude a dark, almost mystical quality. Their music is enhanced by a unique and sublime visual aesthetic, making for an immersive and unforgettable live performance."
          genre="avant-garde pop"
          role="drums and synthesizer"
          type="band"
          pageUrl="https://theholymountain.net"
          musicUrl="https://open.spotify.com/artist/04GXo6z6x1KLMG9weDPayK?si=5wuVoAz1SqqsndsFbkKmYQ"
        />
        <MusicListItem
          title="Karwowski, Kann & Tidemann"
          summary="KKT (Karwowski, Kann og Tidemann + Nordahl) is a dynamic audio-visual quartet that offers audiences a thought-provoking and immersive concert experience. Their performances feature a unique combination of guitar, vocals, live electronics, and projected visual art, creating a space for exploration and contemplation. The music is improvisational and meditative, while the visual art serves to engage and connect with the audience and the environment, resulting in a one-of-a-kind and captivating experience."
          role="live electronics"
          type="band"
          pageUrl="https://www.facebook.com/karwowskikanntidemann"
          musicUrl="https://vimeo.com/karwowskikanntidemann"
        />
        <MusicListItem
          title="Radio 9"
          summary="Radio 9 takes you on a sonic journey, seamlessly transitioning from subtle and mellifluous atmospheres to jarring post-punk whiteouts. Whether you're cruising down the Autobahn or exploring new musical landscapes, Radio 9 will deliver."
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
