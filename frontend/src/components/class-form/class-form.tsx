import React, { useState, useEffect } from 'react';
import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { REQUIRED_FIELD, DEFAULT_IMAGE, DEFAULT_PDF } from '../../constants';
import {
  DateTimePickerSelector,
  ControlledSelect,
  BackdropWithLoader,
  Toast,
  ControlledTextField
} from '../../components';

import { Button, IconButton } from '@mui/material';

import { FileInput } from './styles';

import { client } from '../../client';
import { teachers } from '../../utils';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';
import { FileCopy } from '@mui/icons-material';

dayjs.extend(utc);

function ClassForm() {
  const methods = useForm();

  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument>();
  const [fileAsset, setFileAsset] = useState<SanityAssetDocument>();
  const [teacherArrayList, setTeacherArrayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { push } = useRouter();
  const fetchTeachers = async () => {
    setTeacherArrayList(await client.fetch(teachers));
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const selectedFile = (e.currentTarget as HTMLInputElement).files[0];
    try {
      const document = await client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      });

      setFileAsset(document);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = () => {
    setIsLoading(true);
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
      file: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: fileAsset?._id || DEFAULT_PDF
        }
      },
      teacher: {
        _type: 'teacher',
        _ref: teacher
      },
      time: dayjs(selectedDate['$d']).utc().format()
    };

    client.create(doc).then(() => {
      setIsLoading(false);
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
          <label htmlFor="icon-button-file">
            <Controller
              name="file"
              control={methods.control}
              render={() => (
                <React.Fragment>
                  <FileInput
                    id="icon-button-file"
                    type="file"
                    onChange={uploadFile}
                    accept=".pdf"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <FileCopy />
                  </IconButton>
                </React.Fragment>
              )}
            />
          </label>
          <button type="submit">AQUI</button>
        </form>
      </FormProvider>
      <Toast
        open={isError}
        setOpen={setIsError}
        message="Falha ao realizar o upload."
      />
    </React.Fragment>
  );
}

export default ClassForm;
