import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import DateTime from '../components/DateTime';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    let fields = {};
    switch (user) {
      case "Admin":
        if (visitor === "guest") {
          const email = "yogendra@12";
          fields = { email, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Adminlogin');
        }
        break;
      case "Student":
        if (visitor === "guest") {
          const rollNum = "1";
          const studentName = "Dipesh Awasthi";
          fields = { rollNum, studentName, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Studentlogin');
        }
        break;
      case "Teacher":
        if (visitor === "guest") {
          const email = "tony@12";
          fields = { email, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Teacherlogin');
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      switch (currentRole) {
        case 'Admin':
          navigate('/Admin/dashboard');
          break;
        case 'Student':
          navigate('/Student/dashboard');
          break;
        case 'Teacher':
          navigate('/Teacher/dashboard');
          break;
        default:
          break;
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Admin")}>
              <Box mb={2}>
                <AccountCircle fontSize="large" />
              </Box>
              <StyledTypography>
                Admin Login
              </StyledTypography>
              Login as an administrator.
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Student")}>
              <Box mb={2}>
                <School fontSize="large" />
              </Box>
              <StyledTypography>
                Student/Parent Login
              </StyledTypography>
              Login as a student.
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Teacher")}>
              <Box mb={2}>
                <Group fontSize="large" />
              </Box>
              <StyledTypography>
                Teacher Login
              </StyledTypography>
              Login as a teacher.
            </StyledPaper>
          </Grid>
          {/* DateTime Component */}
          <Grid item xs={12}>
            <DateTime />
          </Grid>
          {/* End DateTime Component */}
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff2cc', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait....
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #343d46, #4f5b66);
  min-height: 100vh;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #65737e;
  color: #c0c5ce;
  cursor: pointer;

  &:hover {
    background-color: #a7adba;
    color: #343d46;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
