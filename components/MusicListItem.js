import MyLink from "./MyLink";
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
      <div className="pb-2">
        <h2 className="text-xl font-bold pb-2">{title}</h2>
        <p className="pb-2">
          {summary} I play {role}.
        </p>
        <div className="items-center space-y-1 pt-2">
          <div className="flex space-x-2 items-center">
            <Icon id="details" iconSize={"text-md"} />
            {/* <p>•</p> */}
            <MyLink href={pageUrl}>official page</MyLink>
          </div>
          <div className="flex items-center space-x-2">
            <Icon id="audio" iconSize={"text-md"} />
            {/* <p>•</p> */}
            <MyLink href={musicUrl}>music</MyLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicListItem;
