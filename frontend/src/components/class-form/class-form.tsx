import React, { useState, useEffect } from 'react';
import { SanityImageAssetDocument } from '@sanity/client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { REQUIRED_FIELD } from '../../constants';
import {
  DateTimePickerSelector,
  ControlledSelect,
  BackdropWithLoader,
  Toast,
  ControlledTextField
} from '../../components';

import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { FileInput } from './styles';

import { client } from '../../client';
import { teachers } from '../../utils';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';

dayjs.extend(utc);
const DEFAULT_IMAGE =
  'image-461cd5a0e8c59bae4c8812e6494fbc81e0e0df1e-2121x1414-jpg';
function ClassForm() {
  const methods = useForm();

  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument>();
  const [teacherArrayList, setTeacherArrayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();
  const fetchTeachers = async () => {
    setTeacherArrayList(await client.fetch(teachers));
  };
  const uploadImage = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const selectedImage = (e.target as HTMLInputElement).files[0];
    try {
      const document = await client.assets.upload('image', selectedImage, {
        contentType: selectedImage.type,
        filename: selectedImage.name
      });
      setImageAsset(document);
      setIsLoading(false);
      console.log(document);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    const { title, link, duration, teacher, selectedDate } =
      methods.getValues();
    const doc = {
      _type: 'classroom',
      _id: uuid(),
      title,
      link,
      duration: Number(duration),
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset?._id || DEFAULT_IMAGE
        }
      },
      teacher: {
        _type: 'teacher',
        _ref: teacher
      },
      time: dayjs(selectedDate['$d']).utc().format()
    };

    client.create(doc).then(() => {
      push('/success');
    });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <React.Fragment>
      <BackdropWithLoader isLoanding={isLoading} />
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
              render={() => (
                <React.Fragment>
                  <FileInput
                    id="icon-button-file"
                    type="file"
                    onChange={uploadImage}
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
            label="Professor"
          />
          <button type="submit">AQUI</button>
        </form>
      </FormProvider>
      <Toast
        open={isError}
        setOpen={setIsError}
        message="Falha ao realizar o upload da imagem."
      />
    </React.Fragment>
  );
}

export default ClassForm;
