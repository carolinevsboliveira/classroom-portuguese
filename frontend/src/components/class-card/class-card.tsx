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

const ClassCard = ({class} : any) =>  {
  const fetchClasses = async () => {
    return setClasses(await client.fetch(classesQuery));
  };
  const [classes, setClasses] = useState<Array<any>>();

  useEffect(() => {
    fetchClasses();
  }, []);

  //console.log(classes);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default ClassCard