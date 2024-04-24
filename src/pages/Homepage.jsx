import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import { LightPurpleButton } from '../components/buttonStyles';
import Students from "../assets/Background.png";
import styled, { keyframes } from 'styled-components';

// Homepage component
const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <StyledImage src={Students} alt="students" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            Student Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>Empower your educational institution with our 
                            comprehensive
                             Student Management System, designed to streamline school
                              operations, effortlessly organize classes, and efficiently
                               manage students and faculty. Seamlessly track attendance, 
                               assess performance, and provide valuable feedback to foster
                                academic growth. With easy access to records, marks, and
                                 seamless communication tools, elevate your institution
                                  efficiency and effectiveness in nurturing student success.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText>
                                Do not have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#ffffff"}}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

// Styled components
const fadeInAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const cartoonAnimation = keyframes`
  0% { transform: rotate(0); }
  50% { transform: rotate(-5deg); }
  100% { transform: rotate(0); }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  background-color: #343d46;
  color: #c0c5ce;
  animation: ${fadeInAnimation} 1s ease-in-out;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
  animation: ${cartoonAnimation} 5s infinite;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledImage = styled.img`
  width: 100%;
`;

export default Homepage;
