import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter} from "react-router-dom";
import BaseRoute from "./apps/BaseRoute";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
      <Layout>
        <BaseRoute/>
      </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
