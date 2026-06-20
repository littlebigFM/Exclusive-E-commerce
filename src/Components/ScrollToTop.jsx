import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every single time the route path changes

  return null; // This component doesn't render any UI, it just handles the scroll logic
};

export default ScrollToTop;
