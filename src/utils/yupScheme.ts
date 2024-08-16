import * as yup from 'yup';
import countries from './countriesList';

const schema = yup.object({
  name: yup
    .string()
    .required('Fill this field')
    .matches(/^[A-ZА-Я]/, 'First letter should be uppercased'),
  age: yup
    .string()
    .required('Fill this field')
    .test({
      message: 'Age must consist only of digits',
      test: (value) => {
        if (value.match(/^\d+$/)) return true;
        return false;
      },
    })
    .test({
      message: 'Enter valid number for age (diap. 1~199 years)',
      test: (value) => {
        if (value.match(/^([1-9]|[1-9][\d]|[1][0-9][0-9])$/)) return true;
        return false;
      },
    }),
  email: yup
    .string()
    .required('Fill this field')
    .email('Must be a valid email')
    .matches(/^[\w-]+@([\w-]+\.)+[a-z]{2,4}$/, 'Must be a valid email'),
  password: yup
    .string()
    .required('Fill this field')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[a-z]/, 'At least one lowercased letter')
    .matches(/[A-Z]/, 'At least one uppercased letter')
    .matches(/[!?@#$%^&*]/, 'At least one special character'),
  confirmPassword: yup
    .string()
    .required('Retype your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  gender: yup
    .string()
    .required()
    .oneOf(['male', 'female', ''], 'Should be male or female')
    .label('gender'),
  isTerms: yup.bool().default(false).oneOf([true], 'You must accept the terms and conditions'),
  img: yup
    .mixed()
    .default({})
    .test({
      message: 'File is required',
      test: (value) => {
        const file = value as FileList;
        if (!file.length) return false;
        return true;
      },
    })
    .test({
      message: 'Max allowed size is 1 Megabyte',
      test: (value) => {
        const file = value as FileList;
        if (!file.length) return false;
        if (file[0].size > 1000000) return false;
        return true;
      },
    })
    .test({
      message: 'Only png or jpeg',
      test: (value) => {
        const file = value as FileList;
        if (!file.length) return false;

        const type = file[0].type.split('/');
        if (type.includes('png') || type.includes('jpeg')) return true;
        return false;
      },
    }),
  country: yup
    .string()
    .required('Fill this field')
    .test({
      message: 'No such country',
      test: (value) => {
        if (Object.values(countries).includes(value)) return true;
        return false;
      },
    }),
});

export default schema;
