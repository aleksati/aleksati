import Icon from "./Icon";
import MyLink from "./MyLink";

const RSSLink = () => (
  <MyLink href="/rss.xml" type="pagination">
    <div className="flex space-x-1 items-center">
      <Icon id="rss" iconSize="sm" />
      <p>RSS</p>
    </div>
  </MyLink>
);

export default RSSLink;
