import * as React from "react";

const useWindowScroll = () => {
  const [isMaxScroll, setIsMaxScroll] = React.useState(false);
  const handleScroll = () => {
    setIsMaxScroll(false);

    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    setIsMaxScroll(true);
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isMaxScroll;
};

export default useWindowScroll;
