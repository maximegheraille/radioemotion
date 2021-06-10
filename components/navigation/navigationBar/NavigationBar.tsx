import React, { Fragment } from "react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCaretUp,
  faMoon,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/images/RadioEmotion.png";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useAppDispatch, useAppSelector } from "../../../config/context/hook";
import { changeTheme } from "../../../config/context/darkThemeSlice";

interface dropdown {
  name: string;
  href: string;
  icon: IconDefinition;
}
interface navigationItem {
  name: string;
  href: string;
  icon?: IconDefinition;
  childs?: dropdown[];
}

type navigationType = navigationItem;
interface NavigationProps {
  nav: navigationItem[];
  openSideNav: boolean;
  setOpenSideNav: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const NavigationBar = ({
  nav,
  openSideNav,
  setOpenSideNav,
}: NavigationProps) => {
  const dispatch = useAppDispatch();
  const { darkTheme } = useAppSelector((state) => state);
  const { asPath } = useRouter();
  // const [playing, setPlaying] = useState<boolean>(false);

  return (
    <>
      <nav className="bg-[#2d2180] /*bg-gray-800*/ h-full px-2 w-full">
        <div className="h-full flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => {
                setOpenSideNav(!openSideNav);
              }}
            >
              <FontAwesomeIcon
                className="text-white block h-6 w-6"
                size="2x"
                icon={faBars}
              />
            </button>
          </div>
          <div className="hidden lg:flex flex-none">
            <div className="flex-shrink-0 py-2 flex items-center">
              <div className="w-full px-2 items-center flex place-content-center">
                {/* <Image
                  width={95}
                  height={43}
                  layout="intrinsic"
                  src={logo}
                  className="bg-white"
                /> */}
                <div className="w-20">
                  <Image
                    width={95}
                    height={43}
                    layout="responsive"
                    src={logo}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="sm:ml-6">
              <div className="flex xl:space-x-4 items-center h-full">
                {nav.map((item: navigationType, index: number) => (
                  <>
                    {!item.childs && item.icon ? (
                      <Link href={item.href.toLowerCase()} key={index}>
                        <a
                          className={`${
                            asPath.toLowerCase() === item.href.toLowerCase()
                              ? "bg-[#10045f] /*bg-gray-900*/ text-white"
                              : "text-gray-300"
                          } hover:bg-[#181144] hover:bg-[#181144] hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                          aria-current={
                            asPath.toLowerCase() === item.name
                              ? "page"
                              : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ) : (
                      <Popover.Group as="div" key={index}>
                        <Popover className="relative">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`${
                                  asPath.toLowerCase() ===
                                  item.href.toLowerCase()
                                    ? "bg-[#10045f] bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-[#181144]"
                                } hidden md:flex px-3 py-2 rounded-md text-sm font-medium`}
                              >
                                <span>{item.name}</span>
                                <FontAwesomeIcon
                                  icon={open ? faCaretUp : faCaretDown}
                                  className={`${
                                    open ? "text-gray-600" : "text-gray-400"
                                  }
                                        ml-2 h-5 w-5 group-hover:text-gray-500`}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel
                                  static
                                  className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-[15rem] sm:px-0"
                                >
                                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 xl:gap-4 xl:p-5">
                                      {item.childs?.map(
                                        (item: dropdown, index: number) => (
                                          <a
                                            key={index}
                                            href={item.href}
                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                          >
                                            <FontAwesomeIcon
                                              icon={item.icon}
                                              className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                              aria-hidden="true"
                                            />
                                            <div className="ml-4">
                                              <p className="text-base font-medium text-gray-900">
                                                {item.name}
                                              </p>
                                              <p className="mt-1 text-sm text-gray-500">
                                                {item.name}
                                              </p>
                                            </div>
                                          </a>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </Popover.Group>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="hidden lg:flex">
              <button
                className="lg:pr-1 lg:relative lg:focus:outline-none"
                onClick={() => {
                  dispatch(changeTheme(!darkTheme));
                }}
              >
                <div
                  className={`w-10 h-4 xl:w-12 xl:h-5 transition rounded-full outline-none bg-[#0e0e10] bg-primary-100 dark:bg-[rgba(164,167,181,1)]`}
                ></div>
                <div
                  className={`absolute top-0 p-1 left-0 inline-flex items-center justify-center w-4 h-4 xl:w-5 xl:h-5 transition-all duration-300 transform scale-110 rounded-full shadow-sm translate-x-6 text-primary-100 bg-white text-black dark:translate-x-0 dark:-translate-y-px dark:bg-white dark:text-dark`}
                >
                  {!darkTheme ? (
                    <FontAwesomeIcon icon={faMoon} className="h-3 xl:w-5" />
                  ) : (
                    <FontAwesomeIcon icon={faSun} className="h-3 xl:w-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
