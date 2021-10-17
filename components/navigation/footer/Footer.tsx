import {
  faAndroid,
  faApple,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCookieBite,
  faEnvelope,
  faFile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../config/context/hook";
import { changeCookies } from "../../../config/context/cookieSlice";

const Footer = () => {
  const { darkTheme } = useAppSelector((state) => state.darkTheme);
  const { cookie } = useAppSelector((state) => state.cookieConsent);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <footer className={`bg-[#2D2081] pb-[3rem] text-white`}>
      <div className="text-center space-y-6 lg:space-y-0 lg:flex w-full justify-evenly p-6 ">
        <div className="lg:w-3/12 space-y-4">
          <p className="text-lg">RADIO EMOTION</p>
          <p>
            Emotion est la radio indépendante de Braine-L'Alleud / Waterloo /
            Braine-le-Château / Lasne /... ( Brabant Wallon - Belgique ).
            <br />
            Un média de proximité avec vos infos nationales, internationales et
            régionales ...
          </p>
        </div>
        <div className="">
          <p className="text-lg">LIENS</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a
              href={
                "https://apps.apple.com/be/app/radio-emotion-belgique/id1406151362?mt=8"
              }
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faApple} className="mr-2" /> Application
              IOS
            </a>
            <a
              href={
                "https://play.google.com/store/apps/details?id=com.Radio.Emotion&gl=BE"
              }
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faAndroid} className="mr-1" /> Application
              Android
            </a>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                }}
                className="text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <FontAwesomeIcon icon={faCookieBite} className="mr-2" /> Cookies
              </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => {
                  setIsOpen(false);
                }}
              >
                <div className=" min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div
                      className={`${
                        darkTheme ? "dark" : ""
                      } inline-block align-middle lg:align-baseline`}
                    >
                      <div
                        className={`rounded-lg text-black dark:text-white shadow-lg bg-[#FFFFFF] dark:bg-[#292928] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform`}
                      >
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-medium leading-6"
                        >
                          Information sur l'utilisation de nos cookies
                        </Dialog.Title>
                        <div className="mt-6">
                          <p className="text-sm ">
                            Nous utilisons des cookies pour vous offrir une
                            meilleure expérience de navigation ainsi qu'analyser
                            le trafic sur notre site.
                          </p>
                          <Switch.Group>
                            <div className="flex place-content-start lg:space-x-4 mt-6 w-full">
                              <div className="flex flex-col items-center ">
                                <Switch
                                  checked={cookie === null ? false : cookie}
                                  onChange={() => {
                                    dispatch(changeCookies(!cookie));
                                  }}
                                  className={`${cookie} ${
                                    cookie ? "bg-blue-600" : "bg-gray-200"
                                  } relative inline-flex items-center h-6 rounded-full w-11`}
                                >
                                  <span className="sr-only">
                                    {cookie
                                      ? "Cookies authorizer"
                                      : "Cookies pas authorizer"}
                                  </span>
                                  <span
                                    className={`${cookie} transition-all ${
                                      cookie ? "translate-x-6" : "translate-x-1"
                                    } inline-block w-4 h-4 transform bg-white rounded-lg`}
                                  />
                                </Switch>

                                <p className="text-sm mt-1 text-center">
                                  {cookie ? "Activé" : "Desactivé"}
                                </p>
                              </div>
                              <div className="flex place-content-start place-items-start">
                                <Switch.Label className=" text-gray-600 dark:text-gray-300 justify-items-start">
                                  Statistiques
                                </Switch.Label>
                              </div>
                            </div>
                          </Switch.Group>
                        </div>

                        <div className="mt-4 flex place-content-end">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#2D2081] border border-transparent rounded-lg hover:bg-[#181144] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            Sauver
                          </button>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
        <div className="">
          <p className="text-lg">CONTACT</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a href="mailto:info@radioemotion.be">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              info@radioemotion.be
            </a>
            <a href="tel: 02 318 66 39">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              02 318 66 39
            </a>
            <Link href="/mentionslegales">
              <a>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Mentions Legales
              </a>
            </Link>
          </div>
        </div>

        <div className="">
          <p className="text-lg">SUIVEZ-NOUS</p>
          <div className="flex flex-col pt-4 space-y-2">
            <a
              href={"https://www.facebook.com/1049fm/"}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-1 " />
              Facebook
            </a>
            <a
              href={"https://www.instagram.com/radioemotionbelgique/"}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-1 " />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#251A67] text-center py-3 flex justify-center">
        <p>
          Radio Emotion (Queen A.S.B.L) &copy; {new Date().getFullYear()}
          Copyright
        </p>
      </div>
    </footer>
  );
};

export default Footer;
