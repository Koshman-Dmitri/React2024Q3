export interface IFormInput {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | '';
  isTerms: boolean;
  img: object | FileList | string;
  country: string;
  id?: string;
}
