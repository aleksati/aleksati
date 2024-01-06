import Link from "next/link";
import Icon from "./Icon";

const RSSLink = () => (
  <div>
    <Link href="/rss.xml">
      <div className="flex space-x-1 items-center">
        <Icon id="rss" iconSize="sm" />
        <p>rss</p>
      </div>
    </Link>
  </div>
);

export default RSSLink;
