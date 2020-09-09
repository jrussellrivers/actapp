import React from "react";
import Feed from "./features/feed/Feed";
import Login from "./features/login/Login";
// import About from "./features/About";
const routes = {
  "/": () => <Feed />,
  "/Login": () => <Login />,
//   "/contact": () => <Contact />
};
export default routes;