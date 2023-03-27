import MyLink from "./MyLink";
// import MyImage from "./MyImage";
import Icon from "./Icon";

const MusicListItem = ({
  summary,
  title,
  type,
  genre,
  role,
  // img,
  pageUrl,
  musicUrl,
}) => {
  return (
    <div className="flex flex-col pb-2 border-b border-secondary">
      <div className="space-y-2 pb-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex text-secondary space-x-2 text-sm">
          <div className="flex space-x-1">
            <p>{type}</p>
          </div>
          <p>•</p>
          <div>
            <p>{genre}</p>
          </div>
        </div>
        <div>
          <p>
            {summary} I play {role}.
          </p>
        </div>
        <div className="text-sm">
          <div className="flex space-x-2 items-center">
            <Icon id="details" iconSize={"text-md"} />
            <MyLink href={pageUrl}>official page</MyLink>
          </div>
          <div className="flex space-x-2 items-center">
            <Icon id="audio" iconSize={"text-md"} />
            <MyLink href={musicUrl}>music</MyLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicListItem;
