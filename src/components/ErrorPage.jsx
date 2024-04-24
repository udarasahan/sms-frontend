import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
    return (
        <Container>
            <Content>
                <Heading>Oops, something went wrong</Heading>
                <Text>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </Text>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif; /* Change font-family */
  color: #333; /* Change font color */
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
`;

const Content = styled.div`
  max-width: 800px;
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
  color: #555; /* Change heading color */
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #666; /* Change text color */
`;

export default ErrorPage;
