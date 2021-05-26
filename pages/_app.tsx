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

const Child: React.FC = ({ children }) => {
  //get the current theme from the store
  const { darkTheme } = useAppSelector((state) => state);

  // create a discpatch for allowing to change the theme value
  const dispatch = useDispatch();

  useEffect(() => {
    //on initial component mount, set the theme via a function the verifies it
    dispatch(changeTheme(getInitialTheme()));
  }, []);

  return (
    <>
      <div
        className={`${darkTheme ? "dark bg-[#0F0F10]" : "white bg-[#a4a7b5]"}`}
        style={{ minHeight: "220vh" }}
      >
        {children}
      </div>
    </>
  );
};
const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={rootStore}>
          <Child>
            <Navigation />
            <Component {...pageProps} />
            <Player />
          </Child>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
