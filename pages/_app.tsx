import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { changeTheme } from "../config/context/darkThemeSlice";
import { useAppSelector } from "../config/context/hook";
import { getInitialTheme } from "../config/context/initialTheme";
import { rootStore } from "../config/context/store";
import "../styles/style.scss";

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
        className={`${darkTheme ? "dark bg-[#0e0e10]" : "white bg-[#a4a7b5]"}`}
      >
        {children}
      </div>
    </>
  );
};
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={rootStore}>
        <Child>
          <Component {...pageProps} />
        </Child>
      </Provider>
    </>
  );
};
export default App;
