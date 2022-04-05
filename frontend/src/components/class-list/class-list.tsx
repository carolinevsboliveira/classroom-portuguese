import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { client, urlFor } from '../../client';
import { classesQuery } from '../../utils';
import { ClassCard } from '../class-card';
import { BackdropWithLoader } from '../backdrop-with-loader';
import { useQuery } from 'react-query';
import { Choose, For } from 'react-extras';
const ClassList = () => {
  const fetchClasses = async () => {
    return await client.fetch(classesQuery);
  };

  const { isLoading, data, isFetched } = useQuery('classes', fetchClasses);
  console.log(data);
  return (
    <React.Fragment>
      <Choose>
        <Choose.When condition={isLoading}>
          <BackdropWithLoader isLoanding={isLoading} />
        </Choose.When>
        <Choose.When condition={isFetched && Boolean(data)}>
          <For of={data} render={(item) => <ClassCard classItem={item} />} />
        </Choose.When>
      </Choose>
    </React.Fragment>
  );
};
export default ClassList;
