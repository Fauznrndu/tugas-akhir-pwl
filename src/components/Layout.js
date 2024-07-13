import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/layout.css"

const Layout = ({ children }) => {
  return (
    <div className="layout">
          <div className="">
            <div className="">
            
              <Header />
  
              <section className="">
                <div className="">
                  {children}
                </div>
              </section>
  
              {/* <Footer /> */}
  
          </div>
        </div>
      </div>
  );
};

export default Layout;
