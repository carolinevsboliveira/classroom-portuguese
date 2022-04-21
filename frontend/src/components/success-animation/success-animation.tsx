import React from 'react';
import Lottie from 'react-lottie';
import { ButtonBox, CenteredBox } from './styles';
import * as AnimationData from '../../assets/animations/sucess_animation.json';
import { Button, Stack } from '@mui/material';
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
        <ButtonBox>
          <Button onClick={() => back()} variant="contained">
            Cadastrar nova aula
          </Button>
          <Button onClick={() => push('/classes')} variant="outlined">
            Listagem das aulas
          </Button>
          <Button onClick={() => push('/')} variant="outlined">
            Ir para página inicial
          </Button>
        </ButtonBox>
      </Stack>
    </CenteredBox>
  );
};

export default SucessAnimation;
