import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';

export const StyledField = styled(Field)({
  width: '300px', // Adjust width as needed
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

const FruitForm = () => {
  return (
    <Formik
      initialValues={{ fruit: '', hideBerries: false }}
      onSubmit={(values) => {
        console.log(values);
      }}
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
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FruitForm;
