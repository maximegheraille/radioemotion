import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface side_nav_icon_props {
  label: string;
  icon: IconProp;
  path: string;
  openSideNav: boolean;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
}

const SidenavIcon: React.FC<side_nav_icon_props> = ({
  label,
  icon,
  path,
  openSideNav,
  setOpenSideNav,
}: side_nav_icon_props) => {
  return (
    <>
      <Link href={path}>
        <a onClick={() => setOpenSideNav(!openSideNav)}>
          <div className="mt-2 flex items-center pb-2">
            <span aria-hidden="true" className="ml-4 mr-2">
              <FontAwesomeIcon icon={icon} className="text-white" size="1x" />
            </span>
            <span className="ml-1 text-white text-sm group"> {label} </span>
          </div>
        </a>
      </Link>
    </>
  );
};

export default SidenavIcon;
