export const getInitialTheme = () => {
  try {
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
  } catch {
    return false;
  }
};

export const getInitialCookie = (): boolean | null => {
  try {
    if (localStorage.cookieConsent === "true") {
      return true;
    } else if (localStorage.cookieConsent === "false") {
      return false;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
