import React, { useCallback, useEffect, useState } from 'react';
import { ClassCard } from '../class-card';
import { BackdropWithLoader } from '../backdrop-with-loader';
import { Choose } from 'react-extras';
import Masonry from '@mui/lab/Masonry';
import { ClassListProps } from './interface';

const ClassList = ({ data, isFetched, isLoading }: ClassListProps) => {
  const settingColumns = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1400) return 4;
      if (window.innerWidth >= 800) return 3;
      if (window.innerWidth >= 500) return 2;
    }

    return 1;
  }, []);
  const [column, setColumn] = useState(() => settingColumns());

  useEffect(() => {
    window.addEventListener('resize', () => setColumn(() => settingColumns()));

    return window.removeEventListener('resize', () =>
      setColumn(() => settingColumns())
    );
  }, [setColumn, settingColumns]);

  return (
    <React.Fragment>
      <Choose>
        <Choose.When condition={isLoading}>
          <BackdropWithLoader isLoanding={isLoading} />
        </Choose.When>
        <Choose.When condition={isFetched && Boolean(data)}>
          <Masonry columns={column} spacing={3}>
            {data && data.map((item: any) => <ClassCard classItem={item} />)}
          </Masonry>
        </Choose.When>
      </Choose>
    </React.Fragment>
  );
};
export default ClassList;
