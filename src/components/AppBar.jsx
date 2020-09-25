import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


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
      <AppBar position="fixed" style={{backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none'}}>
        <Toolbar  >
          <Link to='/search'>
                    <Typography >Recherche avancée</Typography>
                </Link>
                <Link to='/actor'>
                    <Typography >Rechercher un acteur</Typography>
                </Link>
                <Link to='/movie'>
                    <Typography >Rechercher un film</Typography>
                </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}