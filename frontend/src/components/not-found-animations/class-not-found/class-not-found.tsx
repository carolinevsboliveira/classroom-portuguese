import React from 'react';
import * as AnimationData from '../../../assets/animations/not-found-class-animation.json';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie';
import { CenteredBox } from '../styles';
import { Button, Typography } from '@mui/material';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: AnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const ClassNotFound = () => {
  const { push } = useRouter();
  return (
    <CenteredBox>
      <Typography>Parece que esta aula não está disponível</Typography>
      <Lottie options={defaultOptions} height="25rem" width="25rem" />
      <Button variant="outlined" onClick={() => push('/classes')}>
        Voltar para a lista de aulas
      </Button>
    </CenteredBox>
  );
};

export default ClassNotFound;
