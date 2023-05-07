import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { RiQuestionMark } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
import { FaBandcamp } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { BsSpotify } from "react-icons/bs";
import { TbWaveSine } from "react-icons/tb";
import { GrSoundcloud } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { AiOutlinePause } from "react-icons/ai";
import { GiMagnifyingGlass } from "react-icons/gi";
import { AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { HiDotsHorizontal, HiAdjustments } from "react-icons/hi";
import { BsKey } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { AiFillGithub, AiFillLinkedin, AiOutlineMenu } from "react-icons/ai";
import { BsMastodon, BsSearch } from "react-icons/bs";

const defaultSize = "text-xl";

const icons = {
  key: (s) => <BsKey className={s} />,
  search: (s) => <BsSearch className={s} />,
  sun: (s) => <BsFillSunFill className={s} id="button-theme" />,
  moon: (s) => <BsFillMoonFill className={s} id="button-theme" />,
  audio: (s) => <TbWaveSine className={s} />,
  about: (s) => <RiQuestionMark className={s} />,
  details: (s) => <GiMagnifyingGlass className={s} />,
  prevArrow: (s) => <MdOutlineArrowBackIosNew className={s} />,
  nextArrow: (s) => <MdOutlineArrowForwardIos className={s} />,
  downArrow: (s) => (
    <MdOutlineArrowForwardIos
      className={s}
      style={{ transform: "rotate(90deg)" }}
    />
  ),
  upArrow: (s) => (
    <MdOutlineArrowForwardIos
      className={s}
      style={{ transform: "rotate(-90deg)" }}
    />
  ),
  x: (s) => <RiCloseLine className={s} />,
  facebook: (s) => <BsFacebook className={s} />,
  instagram: (s) => <RiInstagramFill className={s} />,
  bandcamp: (s) => <FaBandcamp className={s} />,
  youtube: (s) => <AiFillYoutube className={s} />,
  spotify: (s) => <BsSpotify className={s} />,
  contact: (s) => <AiOutlineMail className={s} />,
  soundcloud: (s) => <GrSoundcloud className={s} />,
  shop: (s) => <AiOutlineShoppingCart className={s} />,
  play: (s) => <FiPlay className={s} />,
  pause: (s) => <AiOutlinePause className={s} />,
  heart: (s) => <AiOutlineHeart className={s} />,
  issue: (s) => <MdOutlineReportProblem className={s} />,
  check: (s) => <AiOutlineCheck className={s} />,
  // threedots: (s) => (
  //   <HiDotsHorizontal className={s} style={{ transform: "rotate(-90deg)" }} />
  // ),
  threedots: (s) => <AiOutlineMenu className={s} />,
  filter: (s) => (
    <HiAdjustments className={s} style={{ transform: "rotate(-90deg)" }} />
  ),
  web: (s) => <TbWorldWww className={s} />,
  mastodon: (s) => <BsMastodon className={s} />,
  linkedin: (s) => <AiFillLinkedin className={s} />,
  github: (s) => <AiFillGithub className={s} />,
};

const Icon = ({ iconSize, id }) => {
  if (!id) return null;

  const size = iconSize ? iconSize : defaultSize;

  const icon = icons[id];

  return icon(size);
};

export default Icon;
