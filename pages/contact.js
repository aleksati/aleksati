import LayoutPage from "../layouts/LayoutPage";
import MyLink from "../components/MyLink";
import Icon from "../components/Icon";

export default function Contact() {
  return (
    <LayoutPage pageMeta={{ title: "contact" }} showSearch={false}>
      <div>
        <div className="pb-4">
          <p>aleksati@aleksati net</p>
        </div>
        <div className="space-y-2 pb-4">
          <div className="flex space-x-2 items-center">
            <Icon id="github" />
            <MyLink href="https://github.com/aleksati">github</MyLink>
          </div>
          <div className="flex space-x-2 items-center">
            <Icon id="mastodon" />
            <MyLink href="https://sigmoid.social/@aleksati">mastodon</MyLink>
          </div>
          <div className="flex space-x-2 items-center">
            <Icon id="instagram" />
            <MyLink href="https://www.instagram.com/alexfurimmer">
              instagram
            </MyLink>
          </div>
          <div className="flex space-x-2 items-center">
            <Icon id="linkedin" />
            <MyLink href="https://www.linkedin.com/in/aleksander-tidemann-b4667816b">
              linkedin
            </MyLink>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
