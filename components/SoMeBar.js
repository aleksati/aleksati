import Icon from "./Icon";

const SoMeBar = ({ exclude = [], className }) => {
  const some = [
    {
      key: "contact",
      url: "mailto:aleksandertid(at)gmail",
    },
    {
      key: "github",
      url: "https://github.com/aleksati",
    },
    {
      key: "instagram",
      url: "https://www.instagram.com/alexfurimmer/",
    },
    {
      key: "linkedin",
      url: "https://www.linkedin.com/in/aleksander-tidemann-b4667816b/",
    },
    {
      key: "mastodon",
      url: "https://sigmoid.social/@aleksati",
    },
  ];

  return (
    <div className={`flex space-x-2 py-1 ${className}`}>
      {some.map((some) => {
        if (exclude.includes(some.key)) return;
        return (
          <div>
            <a
              role="link"
              key={some.key}
              href={some.url}
              aria-label={some.key}
              className="hover:cursor-pointer">
              <Icon id={some.key} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SoMeBar;
