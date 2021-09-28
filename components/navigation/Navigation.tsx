import React, { useState } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import Sidenav from "./sideNav/SideNav";
import {
  faCalendarAlt,
  faClock,
  faHeart,
  faHome,
  faList,
  faMap,
  faMicrophone,
  faMusic,
  faNewspaper,
  faSitemap,
  faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
interface dropdown {
  name: string;
  href: string;
  icon: IconDefinition;
}
export interface accordion {
  setElement: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  element: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
export interface navigationItem {
  name: string;
  href: string;
  icon: IconDefinition;
  childs?: dropdown[];
  accordion?: accordion[];
}
const Navigation = () => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);

  const navItems: navigationItem[] = [
    { name: "Accueil", href: "/", icon: faHome },
    {
      name: "Ma Radio",
      href: "/radio",
      icon: faMusic,
      childs: [
        { name: "Presentation", href: "/Presentation", icon: faSitemap },
        { name: "Emissions", href: "/Emissions", icon: faMicrophone },
        { name: "Equipe", href: "/Equipe", icon: faUsers },
      ],
    },
    {
      name: "Ma Region",
      href: "/region",
      icon: faMap,
      childs: [
        { name: "Info regionale", href: "/actualites", icon: faNewspaper },
        { name: "Agenda", href: "/agenda", icon: faCalendarAlt },
      ],
    },
    { name: "Playlist", href: "/Playlist", icon: faClock },
    { name: "Nouveautes", href: "/Nouveautes", icon: faNewspaper },
    { name: "Top 30", href: "/Top30", icon: faList },
    {
      name: `Votes ${new Date().getFullYear()}`,
      href: `/votes`,
      icon: faHeart,
    },
  ];

  return (
    <nav className="bg-[#2d2180] h-12 px-2 w-full fixed z-50">
      <div className="h-full">
        <NavigationBar
          nav={navItems}
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
      </div>
      <div className="lg:hidden">
        <Sidenav
          nav={navItems}
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
      </div>
    </nav>
  );
};

export default Navigation;
