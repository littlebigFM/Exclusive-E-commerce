// 🔌 BACKEND: replace with GET /api/categories

import { BsPhone } from "react-icons/bs";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoWatchOutline } from "react-icons/io5";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { PiHeadphonesLight } from "react-icons/pi";
import { VscGame } from "react-icons/vsc";

export const sidebarCategories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export const browseCategories = [
  { id: 1, icon: BsPhone, label: "Phones" },
  { id: 2, icon: HiOutlineComputerDesktop, label: "Computers" },
  { id: 3, icon: IoWatchOutline, label: "SmartWatch" },
  { id: 4, icon: MdOutlinePhotoCamera, label: "Camera" },
  { id: 5, icon: PiHeadphonesLight, label: "HeadPhones" },
  { id: 6, icon: VscGame, label: "Gaming" },
];
