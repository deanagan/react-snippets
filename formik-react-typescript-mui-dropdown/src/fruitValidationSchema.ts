import * as Yup from 'yup';

const validationSchema = {
  fruitForm: Yup.object().shape({
    fruit: Yup.string().required('Fruit is required'),
    hideBerries: Yup.boolean(),
    textbox: Yup.number()
      .required('This field is required')
      .min(1, 'Must be at least 1')
      .max(100, 'Must be at most 100'), // Default max value
  }),
};

export default validationSchema;
