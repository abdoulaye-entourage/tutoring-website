import { React, useEffect, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Profile from '../ProfileManager/ProfileManager';
import CreateSession from '../SessionManager/CreateSession/CreateSession';
import Sessions from '../SessionManager/Sessions/Sessions';
import dashboardItems from './DashboardItems';

import { Box, Button, Typography, Divider, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import api from '../../../services/api';
import { Main, AppBar, useStyles } from './Styles';
import ReservedSessions from '../SessionManager/ReservedSessions/ReservedSessions';

function Dashboard() {
  const { classes } = useStyles();
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showMain, setShowMain] = useState(true);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const userResponse = await api.get(`/users/profiles/${userId}`);

        setUserData(userResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const profileResponse = await api.get(`/tutors/profile/${userId}`);
        if (profileResponse === null) {
        }
        setProfileData(profileResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchUserData(), fetchProfileData()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTutorSessions = async () => {
      try {
        const response = await api.get('tutors/sessions');

        setSessionData(response.data.sessions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTutorSessions();
  }, []);

  const updateSessions = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  function handleMain() {
    setShowMain(false);
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box>
      <CssBaseline />
      <AppBar className={classes.appBar} open={open}>
        {/* <Typography variant="h5" color="white" textAlign="left">
          Tableau de bord
        </Typography> */}
        <Box className={classes.appBarDashboard}>
          <Box className={classes.appBarDashboardChildren}>
            {dashboardItems.map((item, index) => (
              <Stack
                key={index}
                onClick={handleMain}
                height="100%"
                className={classes.navStack}
              >
                <NavLink to={item.path} className={classes.NavLink}>
                  <Button className={classes.button}>{item.label}</Button>
                </NavLink>
              </Stack>
            ))}
          </Box>
        </Box>
      </AppBar>

      <Main open={open}>
        {!showMain ? (
          <Routes>
            <Route
              path="profile"
              element={
                <Profile profileData={profileData} userData={userData} />
              }
            />

            <Route
              path="sessions"
              element={<Sessions sessionData={sessionData} />}
            />
            <Route
              path="create-session"
              element={<CreateSession updateSessions={updateSessions} />}
            />
            <Route
              path="reserved-sessions"
              element={<ReservedSessions sessionData={sessions} />}
            />
          </Routes>
        ) : (
          <Box open={!open}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>

            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        )}
      </Main>
    </Box>
  );
}

export default Dashboard;
