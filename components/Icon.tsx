import React from "react";
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
import { AiOutlineCheck, AiOutlineExpandAlt } from "react-icons/ai";
import { HiAdjustments, HiRss } from "react-icons/hi";
import { BsKey } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import {
  BsBuildings,
  BsInstagram,
  BsLinkedin,
  BsMastodon,
  BsSearch,
  BsGithub,
} from "react-icons/bs";

const icons: Object = {
  rss: (s: string) => <HiRss className={s} />,
  expand: (s: string) => <AiOutlineExpandAlt className={s} />,
  office: (s: string) => <BsBuildings className={s} />,
  key: (s: string) => <BsKey className={s} />,
  search: (s: string) => <BsSearch className={s} />,
  sun: (s: string) => <BsFillSunFill className={s} id="button-theme" />,
  moon: (s: string) => <BsFillMoonFill className={s} id="button-theme" />,
  audio: (s: string) => <TbWaveSine className={s} />,
  about: (s: string) => <RiQuestionMark className={s} />,
  details: (s: string) => <GiMagnifyingGlass className={s} />,
  prevArrow: (s: string) => <MdOutlineArrowBackIosNew className={s} />,
  nextArrow: (s: string) => <MdOutlineArrowForwardIos className={s} />,
  downArrow: (s: string) => (
    <MdOutlineArrowForwardIos
      className={s}
      style={{ transform: "rotate(90deg)" }}
    />
  ),
  upArrow: (s: string) => (
    <MdOutlineArrowForwardIos
      className={s}
      style={{ transform: "rotate(-90deg)" }}
    />
  ),
  x: (s: string) => <RiCloseLine className={s} />,
  facebook: (s: string) => <BsFacebook className={s} />,
  instagram: (s: string) => <BsInstagram className={s} />,
  bandcamp: (s: string) => <FaBandcamp className={s} />,
  youtube: (s: string) => <AiFillYoutube className={s} />,
  spotify: (s: string) => <BsSpotify className={s} />,
  contact: (s: string) => <AiOutlineMail className={s} />,
  soundcloud: (s: string) => <GrSoundcloud className={s} />,
  shop: (s: string) => <AiOutlineShoppingCart className={s} />,
  play: (s: string) => <FiPlay className={s} />,
  pause: (s: string) => <AiOutlinePause className={s} />,
  heart: (s: string) => <AiOutlineHeart className={s} />,
  issue: (s: string) => <MdOutlineReportProblem className={s} />,
  check: (s: string) => <AiOutlineCheck className={s} />,
  // threedots: (s) => (
  //   <HiDotsHorizontal className={s} style={{ transform: "rotate(-90deg)" }} />
  // ),
  threedots: (s: string) => <AiOutlineMenu className={s} />,
  filter: (s: string) => (
    <HiAdjustments className={s} style={{ transform: "rotate(-90deg)" }} />
  ),
  // web: (s) => <TbWorldWww className={s} />,
  mastodon: (s: string) => <BsMastodon className={s} />,
  linkedin: (s: string) => <BsLinkedin className={s} />,
  github: (s: string) => <BsGithub className={s} />,
};

type Props = {
  iconSize?: string;
  id: string;
};

const Icon = ({ iconSize = "text-2xl", id }: Props) => {
  const icon: (item: string) => React.JSX.Element = icons[id];
  return icon(iconSize);
};

export default Icon;
