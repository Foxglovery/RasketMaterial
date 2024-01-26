import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "./managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (status) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(status);
  };

  const isAdmin = loggedInUser && loggedInUser.roles.includes('Admin');

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={RRNavLink} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Rasket's Rime
          </Typography>

          {loggedInUser ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <List>
                  {isAdmin && (
                    <ListItem button component={RRNavLink} to="/admin/events">
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  )}
                </List>
              </Drawer>
              <Button
                color="inherit"
                onClick={(e) => {
                  e.preventDefault();
                  logout().then(() => {
                    setLoggedInUser(null);
                  });
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RRNavLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}