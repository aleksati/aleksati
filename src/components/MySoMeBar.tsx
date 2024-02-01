import Icon from "./Icon";

type Props = {
  exclude?: string[];
  className?: string;
};

const MySoMeBar = ({ exclude = [""], className }: Props): React.JSX.Element => {
  const some: {
    key: string;
    url: string;
  }[] = [
    {
      key: "office",
      url: "https://people.uio.no/aleksati",
    },
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
          <div
            key={some.key}
            className="hover:cursor-pointer text-secondary opacity-40 hover:opacity-80">
            <a role="link" href={some.url} aria-label={some.key}>
              <Icon id={some.key} iconSize="text-lg" />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default MySoMeBar;
