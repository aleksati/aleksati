import { useRouter } from "next/router";

const useCurrRoute = () => {
  // find the ending of the current url route.
  // underline the current page the user is on
  const router = useRouter();
  const path = router.pathname.slice(1);

  // if its a post or project, then just underline post
  const route = path.replace("/[post]", "").replace("/[project]", "");

  return route;
};

export default useCurrRoute;
