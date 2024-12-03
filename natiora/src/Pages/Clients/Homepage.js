import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../../component/Clients/pageAccueil/Header';
import Footer from '../../component/Clients/pageAccueil/Footer';
import { Box } from '@mui/material';
import Home from '../../component/Clients/pageAccueil/Home';

function Homepage() {
  return (
    <Box>
      <Navbar/> 
      <Home/> 
      <Footer/> 
    </Box>
  );
}

export default Homepage;
