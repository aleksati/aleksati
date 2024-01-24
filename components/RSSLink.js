import Icon from "./Icon";
import MyLink from "./MyLink";

const RSSLink = () => (
  <div>
    <MyLink href="/rss.xml" type="nav">
      <div className="flex space-x-1 items-center">
        <Icon id="rss" iconSize="sm" />
        <p>rss</p>
      </div>
    </MyLink>
  </div>
);

export default RSSLink;
