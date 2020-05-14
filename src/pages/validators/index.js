import * as Yup from 'yup';
import moment from 'moment';

export const errorMessages = {
  requiredNumericField: 'Preencha o campo apenas com números',
  specialCharactersField:
    'Não pode conter letras, espaços em branco ou caracteres especiais',
  studentGroupAmount:
    'A Quantidade mínima não pode ultrapassar a Quantidade máxima de alunos e vice-versa',
};

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

export const street = Yup.string()
  .min(4, 'Deve conter pelo menos 4 caracteres')
  .max(200, 'Não pode ultrapassar 200 caracteres')
  .required('Preencha o campo apenas com números');

export const state = Yup.string()
  .min(2, 'Deve conter duas letras')
  .max(2, 'Não pode ter mais do que duas letras')
  .test(
    'state',
    'Não pode conter números, espaços em branco ou caracteres especiais',
    value => /^[a-zA-Z]+$/gm.test(value)
  )
  .required('Preencha o campo apenas com duas letras');

export const zipcode = Yup.number()
  .typeError(
    'Não pode conter letras, espaços em branco ou caracteres especiais'
  )
  .test(
    'zipcode',
    'Deve conter 8 caracteres numéricos',
    value => String(value).length === 8
  )
  .required('Preencha o campo apenas com números');

export const number = Yup.number().typeError(
  'Não pode conter letras, espaços em branco ou caracteres especiais'
);

export const city = Yup.string()
  .max(120, 'Não pode ultrapassar 120 caracteres')
  .required('Preencha o campo apenas com letras');

export const neighborhood = Yup.string()
  .max(120, 'Não pode ultrapassar 120 caracteres')
  .required('Preencha o campo apenas com letras');

const YupSchema = fields => {
  return Yup.object().shape(fields);
};

export default YupSchema;
