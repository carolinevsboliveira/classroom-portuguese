import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Stack,
  Skeleton
} from '@mui/material';
import { client, urlFor } from '../../client';
import { currentTeacherUserName } from '../../utils';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Choose } from 'react-extras';

const ClassCard = (classItem: any) => {
  const {
    classItem: {
      image,
      link,
      time,
      title,
      duration,
      teacher,
      description,
      file
    }
  } = classItem;
  const fetchTeacherName = async () => {
    return await client.fetch(currentTeacherUserName(teacher._ref));
  };

  const { data: currentTeacher, isFetched: isTeacherNameFetched } = useQuery(
    'currentTeacher',
    fetchTeacherName
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Choose>
        <Choose.When condition={isTeacherNameFetched}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
            title={isTeacherNameFetched ? currentTeacher.userName : ''}
            subheader={dayjs(time).locale('pt-br').format('DD/MM/YYYY HH:mm')}
          />
        </Choose.When>
        <Choose.Otherwise>
          <Skeleton variant="circular" width={40} height={40} />
        </Choose.Otherwise>
      </Choose>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={urlFor(image).url()}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a href={link}>Link da aula</a>
        </Button>
        <Button size="small">{/* <a href={}>Material de Apoio</a> */}</Button>
      </CardActions>
    </Card>
  );
};
export default ClassCard;
