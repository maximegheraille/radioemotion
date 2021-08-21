import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Navigation from "../components/navigation/Navigation";
import Player from "../components/player/Player";
import { changeTheme } from "../config/context/darkThemeSlice";
import { useAppSelector } from "../config/context/hook";
import { getInitialTheme } from "../config/context/initialTheme";
import { rootStore } from "../config/context/store";
import "../styles/style.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
const Child: React.FC = ({ children }) => {
  // create a discpatch for allowing to change the theme value
  const dispatch = useDispatch();
  useEffect(() => {
    //on initial component mount, set the theme via a function the verifies it
    dispatch(changeTheme(getInitialTheme()));
  }, []);
  return (
    <>
      <div
        className={`bg-[#FFFEFE] dark:bg-[#0F0F10]`}
        style={{ minHeight: "220vh" }}
      >
        <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto pt-16">
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
  console.log(pageProps);
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
            <Player />
          </TailwindCssDarkMode>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
