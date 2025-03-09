import Icon from "./Icon";
// import MyLink from "./MyLink";
import Link from "next/link";

const RSSLink = () => (
  <Link href="/rss.xml">
    <div className="flex space-x-1 items-center">
      <Icon id="rss" iconSize="sm" />
      <p>RSS</p>
    </div>
  </Link>
);

export default RSSLink;
