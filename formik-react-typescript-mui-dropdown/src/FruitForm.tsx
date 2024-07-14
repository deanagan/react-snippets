import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import * as Yup from 'yup';
import validationSchema from './fruitValidationSchema';
import { ENTER_NUMBER_FORMAT } from './constants';

export const StyledField = styled(Field)({
  margin: 10,
  width: 300,
});

export const StyledErrorMessage = styled(ErrorMessage)({
  color: 'red',
});

type FruitOption = {
  value: string;
  label: string;
};

const options: FruitOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Grapes' },
  { value: '4', label: 'Blueberry' },
  { value: '5', label: 'Strawberry' },
];

const maxWeightMap: Record<string, number> = {
  '1': 40,
  '2': 50,
  '3': 60,
  '4': 100,
  '5': 100,
};

type FieldType = {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
  };
};

const simulateFetch = (fruit: string, delay: number = 1000) => {
  return new Promise<{ maxWeight: number }>((resolve) => {
    setTimeout(() => {
      resolve({ maxWeight: maxWeightMap[fruit] });
    }, delay);
  });
};

const FruitForm = () => {
  const [initialValues, setInitialValues] = useState({
    fruit: '',
    hideBerries: false,
    textbox: '',
  });

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        const response = await simulateFetch('2'); // Default to banana
        setInitialValues((prevValues) => ({
          ...prevValues,
          fruit: '2',
        }));
      } catch (error) {
        console.error('Error fetching initial values:', error);
      }
    };

    fetchInitialValues();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.lazy((values) => {
        // Dynamically generate validation schema based on values.fruit
        return validationSchema.fruitForm.shape({
          textbox: Yup.number()
            .required('This field is required')
            .min(1, 'Must be at least 1')
            .max(
              maxWeightMap[values.fruit],
              `Must be at most ${maxWeightMap[values.fruit]}`,
            ),
        });
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
      // enableReinitialize
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
              const selectedFruit = e.target.value;
              setFieldValue('fruit', selectedFruit);
              setFieldValue('textbox', ''); // Reset textbox when fruit changes
            }}
            value={values.fruit}
          >
            <MenuItem value=''>Select One</MenuItem>
            {options
              .filter(
                (option) => !values.hideBerries || parseInt(option.value) <= 3,
              )
              .map((option) => (
                <MenuItem key={option.value} value={option.value}>
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
              type='number'
              label={
                values.fruit !== ''
                  ? ENTER_NUMBER_FORMAT.replace(
                      '${0}',
                      maxWeightMap[values.fruit].toString(),
                    )
                  : 'Select a fruit first'
              }
              inputProps={{
                min: 1,
                max: maxWeightMap[values.fruit],
              }}
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
