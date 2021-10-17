import Link from "next/link";
import React from "react";
import { navigationItem } from "../Navigation";
import logo from "../../../public/images/RadioEmotion.png";
import { changeTheme } from "../../../config/context/darkThemeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../config/context/hook";
import { useRouter } from "next/dist/client/router";
import { Disclosure, Transition } from "@headlessui/react";
import Image from "next/image";

interface side_nav_props {
  nav: navigationItem[];
  openSideNav: boolean;
  setOpenSideNav: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Sidenav = ({ nav, openSideNav, setOpenSideNav }: side_nav_props) => {
  const { darkTheme } = useAppSelector((state) => state);
  const { asPath } = useRouter();
  const dispatch = useAppDispatch();
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
                  className={`p-8 h-20 w-full my-4 flex place-content-center items-center`}
                  onClick={() => setOpenSideNav(!openSideNav)}
                >
                  {/* <img
                    src={logo}
                    
                    className="h-full"
                  /> */}
                  <Image src={logo} className="" alt="Radio Emotion logo" />
                </a>
              </Link>
            </div>
            <div className={`w-full pt-7 pb-2`}>
              {nav.map((item, index: number) => (
                <React.Fragment key={index}>
                  {!item.childs && item.icon ? (
                    <Link href={item.href.toLowerCase()}>
                      <a onClick={() => setOpenSideNav(!openSideNav)}>
                        <div
                          className={`pt-2 flex items-center pb-2 flex items-center content-center h-full ${
                            asPath.toLowerCase().toLocaleLowerCase() ===
                            item.href.toLowerCase()
                              ? "bg-[#10045f] text-white"
                              : "text-gray-300"
                          }`}
                        >
                          <span aria-hidden="true" className="ml-4 mr-2">
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="text-white"
                              size="1x"
                            />
                          </span>
                          <span className="ml-1 text-white text-sm group">
                            {item.name}
                          </span>
                        </div>
                      </a>
                    </Link>
                  ) : (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="mt-2 flex items-center w-full pr-4 pb-2 transition-transform transform hover:translate-x-1">
                            <span aria-hidden="true" className="ml-4 mr-2">
                              <FontAwesomeIcon
                                icon={item.icon}
                                className=" text-white"
                                size="1x"
                              />
                            </span>
                            <span className="ml-1 text-white text-sm">
                              {item.name}
                            </span>
                            <span className="ml-auto" aria-hidden="true">
                              <FontAwesomeIcon
                                className={`text-white transform transition-all ease-in-out ${
                                  open ? "rotate-180" : "rotate-0"
                                }`}
                                icon={faCaretDown}
                              />
                            </span>
                          </Disclosure.Button>
                          <Transition
                            enter="transition-all duration-300 ease-in-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition-all duration-300 ease-in-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel
                              as="div"
                              className={`overflow-hidden transition-all duration-300 ease-in-out w-full space-y-1`}
                              style={{ backgroundColor: "rgb(38 28 109)" }}
                              static={true}
                            >
                              {item.childs?.map((item, index: number) => (
                                <Link
                                  href={item.href.toLowerCase()}
                                  key={index}
                                >
                                  <a className={` w-full`}>
                                    <div
                                      className={`${
                                        asPath.toLowerCase() ===
                                        item.href.toLowerCase()
                                          ? "bg-[#10045f] text-white"
                                          : "text-gray-300"
                                      } block p-2 text-sm text-white px-7`}
                                      onClick={() =>
                                        setOpenSideNav(!openSideNav)
                                      }
                                    >
                                      {item.name}
                                    </div>
                                  </a>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-2 flex flex-col items-center place-content-center">
              <div
                className="w-full h-0.5 mb-4"
                style={{ backgroundColor: "rgba(64,84,165)" }}
              ></div>
              <button
                className="pr-1 relative focus:outline-none"
                onClick={() => {
                  dispatch(changeTheme(!darkTheme.darkTheme));
                }}
                aria-label={`${
                  darkTheme.darkTheme
                    ? "Activer le mode jour"
                    : "Activer le mode nuit"
                }`}
              >
                <div
                  className={`w-12 h-6 transition rounded-full outline-none bg-[#0e0e10] bg-primary-100 dark:bg-[#a4a7b5]`}
                ></div>
                <div
                  className={`absolute top-0 p-1 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-300 transform scale-110 rounded-full shadow-sm translate-x-6 text-primary-100 bg-white text-black dark:translate-x-0 dark:-translate-y-px dark:bg-white dark:text-dark'`}
                >
                  {!darkTheme.darkTheme ? (
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
