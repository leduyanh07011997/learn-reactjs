import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import MiniCart from 'features/product/components/MiniCart';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  }
}));

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login'
}

export default function Header() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.current)
  const isLoggedIn = !!loggedInUser.id;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const cartItemsCount = useSelector(cartItemsCountSelector)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUser = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    const action = logout()
    dispatch(action)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton}>
          </CodeIcon>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
                EZ Shop
            </Link>
          </Typography>
          <NavLink className={classes.link} to="/todos">
            <Button color="inherit">Todos</Button>
          </NavLink>
          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">Albums</Button>
          </NavLink>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleClickUser}>
              <AccountCircle />
            </IconButton>
          )}
          
          <Box>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart/>
              </Badge>
            </IconButton>
            <MiniCart />
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog 
        disableBackdropClick 
        disableEscapeKeyDown 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        >
        <IconButton>
          <Close className={classes.closeBtn} onClick={handleClose}></Close>
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}></Register>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already an account. Login here 
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose}></Login>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here 
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}