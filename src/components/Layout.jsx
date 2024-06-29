import React from "react";
import Header from "./Header";
import Main from "./Main";

const Layout = ( {Content} ) => {
  return (
    <>
      <Header/>
      <Main Content={Content}/>
    </>
  )
}

export default Layout;