import React from 'react'
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from "../../components/Footer/Footer";
// import RowList from '../../components/Rows/RowList/RowList';
import { Suspense, lazy } from "react";

 const RowList = lazy(() => import("../../components/Rows/RowList/RowList"));


const Home =()=>{

 
  return (
    <>
      <Header />
      <Banner />
      <Suspense fallback={<h2>Loading...</h2>}>
        <RowList />
      </Suspense>
      <Footer />
    </>
  );
}

export default Home