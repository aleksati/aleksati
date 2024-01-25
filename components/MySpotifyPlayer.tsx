const MySpotifyPlayer = ({ embedUrl }: { embedUrl: string }) => (
  <div>
    <iframe
      width="100%"
      height="420"
      // allowTransparency={true}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="rounded-2xl"
      loading="lazy"
      src={embedUrl}></iframe>
  </div>
);

export default MySpotifyPlayer;
