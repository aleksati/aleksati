import Image from "next/image";
import Icon from "./Icon";

const NavLeft = () => {
  return (
    <div className="flex items-end space-x-2">
      <Image
        src="/img/profile.jpg"
        width={50}
        height={50}
        className="rounded"
      />
      <div className="">
        <p>Aleksander</p>
        <p>Tidemann</p>
      </div>
      <div className="pb-1">
        <Icon id="audio" iconSize={"text-xl"} />
      </div>
    </div>
  );
};

export default NavLeft;
