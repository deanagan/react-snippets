import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Checkbox, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledField = styled(Field)({
  width: '300px', // Adjust width as needed
});

const options = [
  { value: 1, label: 'Apple' },
  { value: 2, label: 'Banana' },
  { value: 3, label: 'Grapes' },
  { value: 4, label: 'Blueberry' },
  { value: 5, label: 'Strawberry' },
];

const FruitForm = () => {
  return (
    <Formik
      initialValues={{ fruit: '', showBerries: true }}
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
            value={''}
            label='Select Fruit'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue('fruit', e.target.value);
            }}
          >
            <MenuItem value=''>Select One</MenuItem>
            {options
              .filter((option) => !values.showBerries || option.value <= 3)
              .map((option) => (
                <MenuItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
          </StyledField>
          <Field
            as={Checkbox}
            id='show-berries-checkbox'
            name='showBerries'
            label='Show Berries'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue('showBerries', e.target.checked);
            }}
          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FruitForm;
