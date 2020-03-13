import * as Yup from 'yup';
import moment from 'moment';

export const email = Yup.string()
  .email('Digite um e-mail válido')
  .required('Preencha o campo de e-mail');

export const password = Yup.string()
  .min(6, 'A senha deve conter pelo menos 6 caracteres')
  .required('Preencha o campo de senha');

export const name = Yup.string()
  .min(2, 'Deve conter pelo menos 2 caracteres')
  .max(140, 'Deve conter até 140 caracteres')
  .required('Preencha o campo');

export const birthdate = Yup.date()
  .max(moment().subtract(18, 'years'), 'Precisa ter pelo menos 18 anos ')
  .required('Preencha o campo');

const YupSchema = fields => {
  return Yup.object().shape(fields);
};

export default YupSchema;
