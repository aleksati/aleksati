import Link from "next/link";
import Icon from "./Icon";

const RSSLink = () => (
  <Link href="/rss.xml">
    <div className="flex space-x-1 items-center text-sm">
      <p>rss</p>
      <Icon id="rss" iconSize="sm" />
    </div>
  </Link>
);

export default RSSLink;
