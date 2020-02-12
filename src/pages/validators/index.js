import * as Yup from 'yup';

export const email = Yup.string()
  .email('Digite um e-mail válido')
  .required('Preencha o campo de e-mail');

export const password = Yup.string()
  .min(6, 'A senha deve conter pelo menos 6 caracteres')
  .required('Preencha o campo de senha');

const YupSchema = fields => {
  return Yup.object().shape(fields);
};

export default YupSchema;
