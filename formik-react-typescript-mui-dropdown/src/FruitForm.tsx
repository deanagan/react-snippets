import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import * as Yup from 'yup';

export const StyledField = styled(Field)({
  width: '300px', // Adjust width as needed
});

export const StyledErrorMessage = styled(ErrorMessage)({
  color: 'red',
});

const options = [
  { value: 1, label: 'Apple' },
  { value: 2, label: 'Banana' },
  { value: 3, label: 'Grapes' },
  { value: 4, label: 'Blueberry' },
  { value: 5, label: 'Strawberry' },
];

type FieldType = {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
  };
};

const simulateFetch = (url: string, delay: number = 1000) => {
  return new Promise<{ fruitName: string; hideBerries: boolean }>(
    (resolve, reject) => {
      setTimeout(() => {
        resolve({ fruitName: 'banana', hideBerries: false });
      }, delay);
    },
  );
};

const FruitForm = () => {
  const [initialValues, setInitialValues] = useState({
    fruit: '',
    hideBerries: false,
    textbox: '', // New textbox field
  });

  useEffect(() => {
    // Simulate an API call to fetch initial values
    const fetchInitialValues = async () => {
      try {
        const response = await simulateFetch(
          'https://api.example.com/initial-values',
        );
        const { fruitName, hideBerries } = response;
        setInitialValues({
          fruit: fruitName,
          hideBerries,
          textbox: '', // New textbox field
        });
      } catch (error) {
        console.error('Error fetching initial values:', error);
      }
    };

    fetchInitialValues();
  }, []);

  const validationSchema = Yup.object().shape({
    fruit: Yup.string().required('Fruit is required'),
    textbox: Yup.string().required('This field is required'), // New validation rule
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <StyledField
            id='fruit-select'
            name='fruit'
            component={TextField}
            select
            label='Select Fruit'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue('fruit', e.target.value);
            }}
            value={values.fruit}
          >
            <MenuItem value=''>Select One</MenuItem>
            {options
              .filter((option) => !values.hideBerries || option.value <= 3)
              .map((option) => (
                <MenuItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
          </StyledField>
          <Field name='hideBerries'>
            {({ field }: FieldType) => (
              <FormControlLabel
                control={
                  <Checkbox
                    id='hide-berries-checkbox'
                    {...field}
                    checked={values.hideBerries}
                    onChange={(e) =>
                      setFieldValue('hideBerries', e.target.checked)
                    }
                  />
                }
                label='Hide Berries'
              />
            )}
          </Field>
          <div>
            <StyledField
              id='textbox'
              name='textbox'
              component={TextField}
              label='Enter Text'
            />
            <StyledErrorMessage name='textbox' component='div' />
          </div>
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FruitForm;
