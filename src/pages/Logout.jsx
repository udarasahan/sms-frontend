import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled, { keyframes } from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            dispatch(authLogout());
            navigate('/');
        }, 1000);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer isLoggingOut={isLoggingOut}>
            <h1>{currentUser.name}</h1>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonContainer>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Not Yet</LogoutButtonCancel>
            </ButtonContainer>
        </LogoutContainer>
    );
};

export default Logout;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #f8f8fa;
  color: #333;
  animation: ${fadeInAnimation} 0.5s ease-in-out;

  ${({ isLoggingOut }) => isLoggingOut && `
    animation: none;
    opacity: 0;
  `}
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #8d5524;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #e0ac69 ; 
`;
