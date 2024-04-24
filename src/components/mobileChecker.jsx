import React, { useState, useEffect } from 'react';
import { SpeedDial } from '@mui/material';
import { styled } from '@mui/system';

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #eeeeee; /* Change the main background color */
    &:hover {
      background-color: #dddddd; /* Change the background color on hover */
    }
  }
`;

const CustomSpeedDial = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the value on the first render
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledSpeedDial ariaLabel="SpeedDial playground example" icon={<TuneIcon />} direction="left">
      {/* SpeedDial actions */}
    </StyledSpeedDial>
  );
};

export default CustomSpeedDial;
