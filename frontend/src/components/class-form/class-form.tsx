import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { REQUIRED_FIELD } from '../../constants';
import { DateTimePickerSelector } from '../date-time-picker-selector';
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { FileInput } from './styles';
import { client } from '../../client';
import { teachers } from '../../utils';
import { ControlledTextField } from '../controlledTextField';
import ControlledSelect from '../controlled-select/controled-select';

function ClassForm() {
  const methods = useForm();

  const [teacherArrayList, setTeacherArrayList] = useState([]);
  const fetchTeachers = async () => {
    setTeacherArrayList(await client.fetch(teachers));
  };
  const onSubmit = () => {
    console.log(methods.getValues());
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h1>Form de inscrever aulas</h1>
          <ControlledTextField
            name="title"
            control={methods.control}
            label="Titulo da aula"
            required={REQUIRED_FIELD}
            type="text"
          />
          <label htmlFor="icon-button-file">
            <Controller
              name="classImage"
              control={methods.control}
              render={({ field: { onChange } }) => (
                <React.Fragment>
                  <FileInput
                    id="icon-button-file"
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </React.Fragment>
              )}
            />
          </label>
          <DateTimePickerSelector />
          <ControlledTextField
            name="link"
            type="text"
            label="Link do Google Meet"
            control={methods.control}
            required={REQUIRED_FIELD}
          />

          <ControlledTextField
            name="duration"
            control={methods.control}
            label="Duração da aula (em minutos)"
            type="number"
            required={REQUIRED_FIELD}
          />
          <ControlledSelect
            name="teacher"
            items={teacherArrayList}
            control={methods.control}
            label="Professor"
          />
          <button type="submit">AQUI</button>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}

export default ClassForm;
