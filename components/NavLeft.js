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
      <div>
        <p>Aleksander</p>
        <p>Tidemann</p>
        {/* <Icon id="audio" /> */}
      </div>
    </div>
  );
};

export default NavLeft;
