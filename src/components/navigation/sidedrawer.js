import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItemIcon } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../../custom-hooks/useSweetAlert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ModeIcon from '@mui/icons-material/Mode';
const SimpleDrawer = ({ users, Signout }) => {
  const [open, setOpen] = useState(false);
  console.log(users)  
  const navigate = useNavigate();
  const toggleDrawer = (value) => {
    setOpen(value);
  };
  const signIn = [{ route: "Sign in", icon: <VpnKeyIcon />, to: "/" }];
  const applicationRoutes = [
    {
      route: 'Add Blog',
      icon: <ModeIcon />,
      path: '/dashboard/add-blogs',
    },
    {
      route: 'View Blogs',
      icon: <ModeIcon />,
      path: '/dashboard/view-blogs',
    }
  ]

  const list = (
    <List>
      <>
        {users.auth ? (
          <>
            <ListItem>
              <ListItemText
                primary={`👋 Hello Admin`}
              />
            </ListItem>
            <Divider sx={{ borderTop: "3px solid lightgrey" }} />

            {applicationRoutes.map((item, index) => (
              <ListItem button key={index} component={RouterLink} to={item.path}>
                <ListItemIcon style={{ color: '#2f034d' }} >{item.icon}</ListItemIcon>
                <ListItemText primary={item.route} />
              </ListItem>
            ))}

            <ListItem
              button
              onClick={() => {
                sweetAlert(
                  "success",
                  "Sign Out",
                  "You are signed out successfully!",
                  () => { },
                  () => { },
                  false
                );
                Signout();
                setOpen(false);
                navigate("/");
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon style={{ color: '#2f034d' }} />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        ) : (
          signIn.map((item, index) => (
            <ListItem
              button
              key={index}
              component={RouterLink}
              to={item.to}
              onClick={() => toggleDrawer(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.route} />
            </ListItem>
          ))
        )}
      </>
    </List>
  );
  return (
    <div>
      <Button onClick={() => toggleDrawer(true)} style={{ color: 'white' }}>
        <MenuOpenIcon style={{ fontSize: "2rem" }} />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '',
            color: 'common.black',
            width: '300',
            borderRadius: '15px 0px 0px 15px',
            margin: "0px 0px 0px 0px",
            // Apply different width for larger screens
            '@media (min-width:900px)': {
              width: 300, // Width for medium and large screens
            },
          },
        }}
      >
        <div style={{ padding: 16 }}>
          {list}
        </div>
      </Drawer>
    </div>
  );
};

export default SimpleDrawer;
