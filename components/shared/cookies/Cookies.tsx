import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../config/context/hook";
import { changeCookies } from "../../../config/context/cookieSlice";
const Cookies = () => {
  const [show, setShow] = useState<boolean>(true);
  const { cookie } = useAppSelector((state) => state.cookieConsent);
  const dispatch = useAppDispatch();

  return (
    <div className="p-2 lg:p-2">
      {cookie === null && (
        <Transition
          as={Fragment}
          appear={true}
          show={cookie === null ? true : false}
          enter="transform ease-out duration-700"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-100"
          leave="transform ease-out duration-700"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-0"
        >
          <div className=" flex flex-col lg:flex-row p-2 bg-[#2D2180] items-center text-indigo-100 leading-none rounded-lg lg:inline-flex transition bottom-20 lg:bottom-8 right-0 lg:right-20 fixed">
            <span className="font-semibold mr-2 text-left flex-auto">
              Nous utilisons des cookies pour vous offrir une meilleure
              expérience de navigation ainsi qu'analyser le trafic sur notre
              site.
            </span>
            <div className="pt-2 lg:pt-0 flex flex-row font-bold">
              <button
                onClick={() => {
                  setShow(!show);
                  dispatch(changeCookies(true));
                }}
                className="flex items-center text-black bg-white rounded-full uppercase px-2 py-1 text-xs font-bold mr-3"
              >
                Accepter <FontAwesomeIcon icon={faCheck} className="ml-2" />
              </button>
              <button
                onClick={() => {
                  setShow(!show);
                  dispatch(changeCookies(false));
                }}
                className="flex items-center rounded-full text-black bg-white uppercase px-2 py-1 text-xs font-bold mr-3"
              >
                Refuser <FontAwesomeIcon icon={faTimes} className="ml-2" />
              </button>
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
};

export default Cookies;
