import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
// import { useLocation } from "react-router-dom";

const logError = (error, info) => {
  // Do something with the error, e.g. log to an external API
  console.log(error);
};

const RootLayout = () => {
  const location=useLocation();
  console.log(location);
  return (
    <>
      <ErrorBoundary FallbackComponent={()=>(<ErrorPage />)} onError={logError} resetKeys={location.pathname}>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
