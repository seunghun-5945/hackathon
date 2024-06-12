import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ( {Content} ) => {
  return (
    <>
      <Header/>
        <Main Content={Content}/>
      <Footer/>
    </>
  )
}

export default Layout;