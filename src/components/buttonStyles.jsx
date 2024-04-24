import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #6e7f80; /* Dark grayish cyan */
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #536872; /* Dark slate gray */
      border-color: #536872; /* Dark slate gray */
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #536872; /* Dark slate gray */
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #708090; /* Slate gray */
      border-color: #708090; /* Slate gray */
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #708090; /* Slate gray */
    color: white;
    &:hover {
      background-color: #536878; /* Dark slate blue */
      border-color: #536878; /* Dark slate blue */
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #536878; /* Dark slate blue */
    color: #fff;
    &:hover {
      background-color: #36454f; /* Charcoal */
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background-color: #6e7f80; /* Dark grayish cyan */
    color: #fff;
    &:hover {
      background-color: #536872; /* Dark slate gray */
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background-color: #708090; /* Slate gray */
    color: #fff;
    &:hover {
      background-color: #536878; /* Dark slate blue */
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #536872; /* Dark slate gray */
    color: #fff;
    &:hover {
      background-color: #708090; /* Slate gray */
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #536878; /* Dark slate blue */
    color: white;
    &:hover {
      background-color: #36454f; /* Charcoal */
      border-color: #36454f; /* Charcoal */
      box-shadow: none;
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background-color: #36454f; /* Charcoal */
    color: white;
    &:hover {
      background-color: #536878; /* Dark slate blue */
    }
  }
`;
