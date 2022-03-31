import React from 'react';
import Lottie from 'react-lottie';
import { CenteredBox } from './styles';
import * as AnimationData from '../../assets/animations/sucess_animation.json';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: AnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const SucessAnimation = () => {
  const { back, push } = useRouter();
  return (
    <CenteredBox>
      <Stack spacing={2}>
        <Lottie options={defaultOptions} height="25rem" width="25rem" />
        <Button onClick={() => back()} variant="contained">
          Cadastrar nova aula
        </Button>
        <Button onClick={() => push('/')} variant="outlined">
          Listagem das aulas
        </Button>
        <Button onClick={() => push('/')} variant="outlined">
          Ir para página inicial
        </Button>
      </Stack>
    </CenteredBox>
  );
};

export default SucessAnimation;
