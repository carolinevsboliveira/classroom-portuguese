import React from 'react';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Skeleton
} from '@mui/material';
import { client, urlFor } from '../../client';
import { currentTeacherUserName, fileUrlQuery, KebabCase } from '../../utils';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useQueries } from 'react-query';
import { Choose } from 'react-extras';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';

const ClassCard = (classItem: any) => {
  const {
    classItem: { image, link, time, title, duration, teacher, subtitle, _id }
  } = classItem;
  const fetchTeacherName = async () => {
    return await client.fetch(currentTeacherUserName(teacher._ref));
  };

  const fileArchive = async () => {
    return await client.fetch(fileUrlQuery(_id));
  };

  const results = useQueries([
    { queryKey: ['teacherName', 1], queryFn: fetchTeacherName },
    { queryKey: ['fileArchive', 2], queryFn: fileArchive }
  ]);

  const { isFetched: isTeacherNameFetched, data: currentTeacher } = results[0];
  const { isFetched: isFileFetched, data: classFile } = results[1];

  const linkUrl = new URL(link).href;

  const { push } = useRouter();

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
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duração: {duration / 60} hora(s)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a href={linkUrl} target="_blank">
            Link da aula
          </a>
        </Button>
        <Button size="small">
          <a
            href={isFileFetched ? classFile[0].file.asset.url : ''}
            target="_blank"
          >
            Material de Apoio
          </a>
        </Button>
        <Button
          size="small"
          onClick={() =>
            push(
              {
                pathname: `/classes/${KebabCase(title)}`,
                query: {
                  id: _id,
                  title: title,
                  fileUrl: classFile[0].file.asset.url ?? ''
                }
              },
              `/classes/${KebabCase(title)}`
            )
          }
        >
          <ArrowForwardIosIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
export default ClassCard;
