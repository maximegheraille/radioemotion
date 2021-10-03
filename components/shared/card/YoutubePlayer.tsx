import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { getInitialTheme } from "../../../config/context/initialTheme";

interface YoutubeProps {
  url: string | undefined;
}

const YoutubePlayer = ({ url = "" }: YoutubeProps) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [darkTheme] = useState<boolean>(getInitialTheme());
  const link = url?.split("/");

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-[60] inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block align-middle h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={`w-full sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-6/12 inline-block align-bottom text-black dark:text-white bg-[#E4E7EA] ${
                  darkTheme && "bg-[#1F1F1E]"
                } rounded-lg text-left overflow-hidden shadow-lg transform transition-all my-8 align-middle w-full`}
              >
                <div className="pb-4">
                  <div className="aspect-w-16 aspect-h-9 flex items-start">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${
                        link[link.length - 1]
                      }`}
                    ></iframe>
                  </div>
                </div>
                <div className="px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`${
                      darkTheme ? "bg-[#1F1F1E] text-white" : "text-black"
                    }  mt-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Femer
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default YoutubePlayer;
