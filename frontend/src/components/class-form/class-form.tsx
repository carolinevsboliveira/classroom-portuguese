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
import { v4 as uuidv4 } from 'uuid';
import { BackdropWithLoader } from '../backdrop-with-loader';

function ClassForm() {
  const methods = useForm();

  const [teacherArrayList, setTeacherArrayList] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoanding, setIsLoanding] = useState(false);

  const fetchTeachers = async () => {
    setTeacherArrayList(await client.fetch(teachers));
  };
  const uploadFile = (e) => {};
  const onSubmit = () => {
    const doc = {
      _type: 'classroom',
      _id: uuidv4(),
      title: methods.getValues().title,
      description: methods.getValues().description,
      time: methods.getValues().selectedDate
    };
    client.createIfNotExists();
    console.log(methods.getValues());
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <React.Fragment>
      <BackdropWithLoader isLoanding={isLoanding} />
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

          <ControlledTextField
            name="description"
            type="text"
            label="Descrição"
            control={methods.control}
            required={REQUIRED_FIELD}
          />

          <label htmlFor="icon-button-file">
            <React.Fragment>
              <FileInput
                id="icon-button-file"
                type="file"
                onChange={uploadFile}
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
