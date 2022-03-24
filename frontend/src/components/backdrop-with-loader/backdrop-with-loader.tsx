import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const BackdropWithLoader = ({ isLoanding }: { isLoanding: boolean }) => {
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoanding}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default BackdropWithLoader;
