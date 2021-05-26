import {
  faCaretDown,
  faClock,
  faHeart,
  faHome,
  faList,
  faMap,
  faMoon,
  faMusic,
  faNewspaper,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../../config/context/darkThemeSlice";
import { useAppSelector } from "../../../config/context/hook";
import logo from "../../../public/images/RadioEmotion.png";
import SidenavIcon from "./Icons";

interface side_nav_props {
  firstElement: boolean;
  secondElement: boolean;
  openSideNav: boolean;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
  setFirstElement: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setSecond: (firstElement: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Sidenav: React.FC<side_nav_props> = ({
  openSideNav,
  firstElement,
  secondElement,
  setFirstElement,
  setOpenSideNav,
  setSecond,
}: side_nav_props) => {
  const dispatch = useDispatch();
  const isDark = useAppSelector((state: any) => state.darkTheme);
  const { asPath } = useRouter();

  return (
    <>
      <div
        onClick={() => {
          setOpenSideNav(!openSideNav);
        }}
        className={`${
          openSideNav ? "block w-screen" : "hidden"
        } fixed inset-0 z-10 bg-transparent`}
      ></div>
      <section
        className={`w-60 bg-[#2d2180] ${
          openSideNav ? "-translate-x-0" : "-translate-x-full "
        } overflow-x-hidden min-h-screen h-auto transition-all duration-300 transform fixed inset-y-0 left-0 z-20 shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none`}
      >
        <div className="w-full left-0">
          <div className="w-full">
            <div className={`flex h-full bg-white`}>
              <Link href="/">
                <a
                  className={`h-20 w-full my-4 flex place-content-center items-center`}
                  onClick={() => setOpenSideNav(!openSideNav)}
                >
                  <img
                    src={logo}
                    alt="Picture of the author"
                    className="h-full"
                  />
                </a>
              </Link>
            </div>
            <div className={`w-full mt-7 pb-2`}>
              <SidenavIcon
                label={"ACCUEIL"}
                icon={faHome}
                path="/"
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
              <div>
                <div
                  className="mt-2 flex items-center w-full pr-4 pb-2 transition-transform transform hover:translate-x-1"
                  onClick={() => {
                    setFirstElement(!firstElement);
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <span aria-hidden="true" className="ml-4 mr-2">
                    <FontAwesomeIcon
                      icon={faMusic}
                      className=" text-white"
                      size="1x"
                    />
                  </span>
                  <span className="ml-1 text-white text-sm"> MA RADIO </span>
                  <span className="ml-auto" aria-hidden="true">
                    <FontAwesomeIcon
                      className={`text-white transform transition-all ease-in-out ${
                        firstElement ? "rotate-180" : "rotate-0"
                      }`}
                      icon={faCaretDown}
                    />
                  </span>
                </div>
                <div
                  style={{ backgroundColor: "rgb(38 28 109)" }}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    !firstElement ? "h-0" : "h-32"
                  } space-y-2 px-7`}
                >
                  <Link href="/">
                    <a
                      className="block p-2 text-sm text-white"
                      onClick={() => setOpenSideNav(!openSideNav)}
                    >
                      PRESENTATION
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      className="block p-2 text-sm text-white"
                      onClick={() => setOpenSideNav(!openSideNav)}
                    >
                      EMISSIONS
                    </a>
                  </Link>
                  <Link href="/">
                    <a
                      className="block p-2 text-sm text-white"
                      onClick={() => setOpenSideNav(!openSideNav)}
                    >
                      EQUIPE
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div
                  className={`mt-2 flex items-center w-full pr-4 pb-2 transition-transform transform hover:translate-x-1 ${
                    asPath.toLowerCase() === "item.href.toLowerCase()"
                      ? "bg-[#10045f] /*bg-gray-900*/ text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setSecond(!secondElement);
                  }}
                >
                  <span aria-hidden="true" className="ml-4 mr-2">
                    <FontAwesomeIcon
                      icon={faMap}
                      className="text-white"
                      size="1x"
                    />
                  </span>
                  <span className="ml-1 text-white text-sm"> MA REGION </span>
                  <span className="ml-auto" aria-hidden="true">
                    <FontAwesomeIcon
                      className={`text-white transform transition-all ease-in-out ${
                        secondElement ? "rotate-180" : "rotate-0"
                      }`}
                      icon={faCaretDown}
                    />
                  </span>
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgb(38 28 109)" }}
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                  !secondElement ? "h-0" : "h-20"
                } space-y-2 px-7`}
              >
                <Link href="/">
                  <a
                    className="block p-2 text-sm text-white transition-colors duration-200 dark:text-light dark:hover:text-light"
                    onClick={() => setOpenSideNav(!openSideNav)}
                  >
                    INFO REGIONALE
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className="block p-2 text-sm text-white transition-colors duration-200 dark:hover:text-light"
                    onClick={() => setOpenSideNav(!openSideNav)}
                  >
                    AGENDA
                  </a>
                </Link>
              </div>
              <SidenavIcon
                label={"PLAYLIST"}
                icon={faClock}
                path="/"
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
              <SidenavIcon
                label={"NOUVEAUTES"}
                icon={faNewspaper}
                path="/"
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
              <SidenavIcon
                label={"TOP 30"}
                icon={faList}
                path="/"
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
              <SidenavIcon
                label={" VOTES 2021"}
                icon={faHeart}
                path="/"
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
            </div>
            <div
              className="w-full h-0.5 mb-4"
              style={{ backgroundColor: "rgba(64,84,165)" }}
            ></div>
            <div className="mt-2 flex items-center place-content-center">
              <button
                className="pr-1 relative focus:outline-none"
                onClick={() => {
                  dispatch(changeTheme(!isDark));
                }}
              >
                <div
                  className={`w-12 h-6 transition rounded-full outline-none bg-[#0e0e10] bg-primary-100 dark:bg-[#a4a7b5]`}
                ></div>
                <div
                  className={`absolute top-0 p-1 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-300 transform scale-110 rounded-full shadow-sm translate-x-6 text-primary-100 bg-white text-black dark:translate-x-0 dark:-translate-y-px dark:bg-white dark:text-dark'`}
                >
                  {!isDark ? (
                    <FontAwesomeIcon icon={faMoon} />
                  ) : (
                    <FontAwesomeIcon icon={faSun} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidenav;
