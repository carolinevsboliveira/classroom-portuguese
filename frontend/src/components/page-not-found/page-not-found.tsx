import { useRouter } from 'next/router';
import React from 'react';
import Lottie from 'react-lottie';
import { CenteredBox } from '../success-animation/styles';
import * as AnimationData from '../../assets/animations/not_found_animation.json';
import { Button } from '@mui/material';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: AnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const PageNotFound = () => {
  const { push } = useRouter();
  return (
    <CenteredBox>
      <Lottie options={defaultOptions} height="25rem" width="25rem" />
      <Button variant="outlined" onClick={() => push('/')}>
        Voltar para a página inicial
      </Button>
    </CenteredBox>
  );
};

export default PageNotFound;
