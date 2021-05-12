export const getInitialTheme = () => {
  if (
    !("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    localStorage.theme = "dark";
    return true;
  } else if (localStorage.theme === "dark") {
    localStorage.theme = "dark";
    return true;
  } else {
    localStorage.theme = "white";
    return false;
  }
};
