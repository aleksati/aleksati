import Icon from "./Icon";

const SoMeBar = ({ iconSize, exclude = [], className }) => {
  const some = [
    {
      key: "facebook",
      url: "https://www.facebook.com/theholymountaintrio",
    },
    {
      key: "instagram",
      url: "https://www.instagram.com/theholymountaintrio/",
    },
    {
      key: "bandcamp",
      url: "https://theholymountain.bandcamp.com/",
    },
    {
      key: "youtube",
      url: "https://www.youtube.com/channel/UCdjPuoIdC6-EDb_tR5h9ayg",
    },
    {
      key: "spotify",
      url: "https://open.spotify.com/artist/04GXo6z6x1KLMG9weDPayK?si=rzFLNrlkTvml0zaKqo_tuQ",
    },
    {
      key: "soundcloud",
      url: "https://soundcloud.com/theholymountainduo",
    },
  ];

  return (
    <div className={`flex flex-row space-x-4 ${className}`}>
      {some.map((some) => {
        if (exclude.includes(some.key)) return;
        return (
          <a
            key={some.key}
            href={some.url}
            role="link"
            aria-label={some.key}
            className="transition duration-200 ease-in-out text-secondary opacity-40 hover:opacity-80">
            <Icon id={some.key} iconSize={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SoMeBar;
