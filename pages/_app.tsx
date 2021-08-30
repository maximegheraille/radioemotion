import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Navigation from "../components/navigation/Navigation";
import Player from "../components/player/Player";
import { changeTheme } from "../config/context/darkThemeSlice";
import { useAppSelector } from "../config/context/hook";
import { getInitialTheme } from "../config/context/initialTheme";
import { rootStore } from "../config/context/store";
import Footer from "../components/navigation/footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "../styles/style.scss";

const Child: React.FC = ({ children }) => {
  // create a discpatch for allowing to change the theme value
  const dispatch = useDispatch();
  useEffect(() => {
    //on initial component mount, set the theme via a function the verifies it
    dispatch(changeTheme(getInitialTheme()));
  }, []);
  //FFFEFE
  return (
    <>
      <div className={`bg-[#EEEFEE] dark:bg-[#0F0F10]`}>
        <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto py-24">
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
  const { darkTheme } = useAppSelector((state) => state);
  return <div className={`${darkTheme ? "dark" : null}`}>{children}</div>;
};

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={rootStore}>
          <TailwindCssDarkMode>
            <Navigation />
            <Child>
              <Component {...pageProps} />
            </Child>
            <Footer />
            <Player />
          </TailwindCssDarkMode>
        </Provider>
      </QueryClientProvider>
    </>
  );
};
export default App;
