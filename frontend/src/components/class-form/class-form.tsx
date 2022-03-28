import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  NativeSelect,
  TextField,
  FormControl
} from '@mui/material';

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { REQUIRED_FIELD } from '../../constants';
import { DateTimePickerSelector } from '../date-time-picker-selector';
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { FileInput } from './styles';
import { client } from '../../client';
import { teachers } from '../../utils';
import { For } from 'react-extras';

function ClassForm() {
  const onSubmit = () => {
    console.log('Hey there');
  };
  const [arrayList, setArrayList] = useState([]);

  const fetchTeachers = async () => {
    setArrayList(await client.fetch(teachers));
  };

  const methods = useForm();
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <form>
          <h1>Form de inscrever aulas</h1>
          <Controller
            name="title"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                label="Título da aula"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD, minLength: 2 }}
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
          <Controller
            name="link"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                label="Link do google meet"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD, minLength: 2 }}
          />
          <Controller
            name="duration"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="text"
                label="Duração da aula (em minutos)"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: REQUIRED_FIELD, minLength: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Professor:
            </InputLabel>

            <NativeSelect
              defaultValue={''}
              inputProps={{
                name: 'teacher'
              }}
            >
              <For
                of={arrayList}
                render={(item, index) => (
                  <option value={item._id} key={index}>
                    {item.userName}
                  </option>
                )}
              ></For>
            </NativeSelect>
          </FormControl>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}

export default ClassForm;
