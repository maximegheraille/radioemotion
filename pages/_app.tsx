import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import Navigation from "../components/navigation/Navigation";
import Player from "../components/player/Player";
import { changeTheme } from "../config/context/darkThemeSlice";
import { useAppDispatch, useAppSelector } from "../config/context/hook";
import {
  getInitialCookie,
  getInitialTheme,
} from "../config/context/initialStates";
import { rootStore } from "../config/context/store";
import Footer from "../components/navigation/footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "../styles/style.scss";
import Cookies from "../components/shared/cookies/Cookies";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
import { initialize } from "../config/context/cookieSlice";
import ToTopButton from "../components/shared/ToTopButton/ToTopButton";
const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const Child: React.FC = ({ children }) => {
  // create a discpatch for allowing to change the theme value
  const dispatch = useDispatch();
  useEffect(() => {
    //on initial component mount, set the theme via a function the verifies it
    dispatch(changeTheme(getInitialTheme()));
  }, []);
  return (
    <>
      <div className={`bg-[#EEEFEE] dark:bg-[#0F0F10] `}>
        <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto py-16 lg:py-24">
          {children}
        </div>
      </div>
    </>
  );
};

//parent div to make sure the parent div has the 'dark' class inside all children,
// even the non children of <Child>
const TailwindCssDarkMode: React.FC = ({ children }) => {
  //get the current theme from the store
  const { darkTheme } = useAppSelector((state) => state.darkTheme);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { initialized, cookie } = useAppSelector(
    (state) => state.cookieConsent
  );
  const prevCookie = usePrevious(cookie);

  useEffect(() => {
    if (getInitialCookie() === true) {
      if (initialized === true) {
        console.log("effect, just gA");
        ReactGA.pageview(window.location.pathname);
      } else {
        dispatch(initialize(true));
        ReactGA.initialize(`${process.env.REACT_GA}`, { debug: true });
        ReactGA.pageview(window.location.pathname);
      }
    }
  }, [cookie]);
  useEffect(() => {
    router.events.on("routeChangeStart", (url: string) => {
      if (getInitialCookie() === true) {
        if (initialized === true) {
          ReactGA.pageview(url);
        } else {
          dispatch(initialize(true));
          ReactGA.initialize(`${process.env.REACT_GA}`, { debug: true });
          ReactGA.pageview(url);
        }
      }
    });
    if (getInitialCookie() !== null) {
      if (getInitialCookie() === true && prevCookie !== undefined) {
        if (initialized) {
          ReactGA.initialize(`${process.env.REACT_GA}`);
        }
        dispatch(initialize(true));
        ReactGA.pageview(window.location.pathname);
      }
    }
    return () => {
      router.events.off("routeChangeStart", () => {});
    };
  }, []);
  return (
    <div className={`${darkTheme ? "dark" : null} overflow-x-hidden`}>
      {children}
    </div>
  );
};
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={rootStore}>
          <TailwindCssDarkMode>
            <Navigation />
            <Child>
              <Component {...pageProps} />
            </Child>
            <ToTopButton />
            <Footer />
            <Player />
            <Cookies />
          </TailwindCssDarkMode>
        </Provider>
      </QueryClientProvider>
    </>
  );
};
export default App;
