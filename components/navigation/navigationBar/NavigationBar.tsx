import React, { Fragment, useRef } from "react";
import Image from "next/image";
import { Popover, Transition, Menu } from "@headlessui/react";
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
                <div className="w-20">
                  <Image
                    // width={95}
                    // height={43}
                    // layout="responsive"
                    src={logo}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="sm:ml-6">
              <div className="flex xl:space-x-4 items-center h-full">
                {nav.map((item: navigationType, index: number) => (
                  <React.Fragment key={index}>
                    {!item.childs && item.icon ? (
                      <Menu >
                        <Link href={item.href.toLowerCase()}>
                          <a
                            className={`${asPath.toLowerCase() === item.href.toLowerCase()
                              ? "bg-[#10045f] text-white"
                              : "text-gray-300"
                              } mx-0.5 hover:bg-[#181144] text-sm lg:text-base hover:text-white px-3 py-2 rounded-md font-medium`}
                            aria-current={
                              asPath.toLowerCase() === item.name
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </a>
                        </Link>
                      </Menu>
                    ) : (
                      <Menu as="div">
                        <Menu.Button
                          className={`${asPath.toLowerCase() === item.href.toLowerCase()
                            ? "bg-[#10045f] text-white"
                            : "text-gray-300 hover:bg-[#181144]"
                            } items-center mx-0.5 text-sm lg:text-base hidden md:flex px-3 py-2 rounded-md font-medium`}
                        >
                          {item.name}
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className={`ml-2 h-5 w-5 group-hover:text-gray-500`}
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute z-10 mt-3 px-2 w-screen max-w-[15rem] sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 xl:gap-4 xl:p-5">
                                {item.childs?.map(
                                  (item: dropdown, index: number) => (
                                    <Menu.Item key={index}>
                                      {({ active }) => (
                                        <NextLink
                                          href={item.href.toLocaleLowerCase()}
                                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100"
                                        >
                                          <FontAwesomeIcon
                                            icon={item.icon}
                                            className={`${active ? 'text-indigo-800' : 'text-indigo-600'} flex-shrink-0 h-6 `}
                                          />
                                          <div className="ml-4">
                                            <p
                                              className={`${active
                                                ? 'text-gray-900' : 'text-gray-700'
                                                } text-base font-medium `}
                                            >
                                              {item.name}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              {item.name}
                                            </p>
                                          </div>
                                        </NextLink>
                                      )}
                                    </Menu.Item>
                                  )
                                )}
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </React.Fragment>
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
function NextLink(props: any) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}
export default NavigationBar;
