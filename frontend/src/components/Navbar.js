
import { NavLink } from "react-router-dom"
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

    const activeStyle = {
        textDecoration : "underline",
        fontWeight : "bold",
        color : "red" 
    }

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/">Dashboard</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/courses">Courses</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/profile">Profile</NavLink>
            <NavLink style={({isActive})=>isActive ? activeStyle : null} to="/login">Login</NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

