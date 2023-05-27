const MySpotifyPlayer = ({ embedUrl }) => {
  return (
    <div className="">
      <iframe
        width="100%"
        height="352"
        allowtransparency="true"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="rounded-2xl"
        loading="lazy"
        src={embedUrl}></iframe>
    </div>
  );
};

{
  /* <iframe
  style="border-radius:12px"
  src="https://open.spotify.com/embed/artist/04GXo6z6x1KLMG9weDPayK?utm_source=generator"
  width="100%"
  height="352"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"></iframe>; */
}

export default MySpotifyPlayer;
