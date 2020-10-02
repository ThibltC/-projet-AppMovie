import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import logo from '../pink_donut_-_2_-512.png';


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '65px' }}>
        <Toolbar  >
          <Link to='/'>
            <img src={logo} className="Mini-logo" alt="logo" />
          </Link>
          <h1>Donuts Movies</h1>
          <Link to='/actor'>
            <button >Rechercher un acteur</button>
          </Link>
          <Link to='/movie'>
            <button >Rechercher un film</button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}