import type { AppProps } from "next/app";
import "../styles/style.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <Navigation /> */}
      <Component {...pageProps} />
    </>
  );
};
export default App;
