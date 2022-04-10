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
import { useAuth } from '../../contexts';

dayjs.extend(utc);

function ClassForm() {
  const methods = useForm();
  const { currentUser } = useAuth();
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument>();
  const [fileAsset, setFileAsset] = useState<SanityAssetDocument>();
  const [teacherArrayList, setTeacherArrayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ state: false, message: '' });
  const { push } = useRouter();
  const fetchTeachers = async () => {
    setTeacherArrayList(await client.fetch(teachers));
  };
  useEffect(() => {
    if (!currentUser) {
      alert('Falha ao autenticar sua sessão.');
      push('/login');
    }
  }, [currentUser]);

  console.log(currentUser);
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
      setError({
        state: true,
        message: 'Falha ao fazer o upload do arquivo.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = () => {
    if (currentUser) {
      setIsLoading(true);
      const {
        title,
        link,
        duration,
        teacher,
        selectedDate,
        description,
        subtitle
      } = methods.getValues();

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
        description,
        time: dayjs(selectedDate['$d']).utc().format(),
        subtitle
      };

      client.create(doc).then(() => {
        setIsLoading(false);
        push('/success');
      });
    } else {
      setError({ message: 'Falha ao autenticar sua sessão.', state: true });
      push('/login');
    }
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
          <ControlledTextField
            name="subtitle"
            control={methods.control}
            label="subtitle"
            required={REQUIRED_FIELD}
            type="text"
            multiline
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
          <ControlledTextField
            name="description"
            control={methods.control}
            label="Descrição"
            required={REQUIRED_FIELD}
            type="text"
            multiline
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
          <Button variant="contained" type="submit">
            Aqui
          </Button>
        </form>
      </FormProvider>
      <Toast open={error.state} setOpen={setError} message={error.message} />
    </React.Fragment>
  );
}

export default ClassForm;
