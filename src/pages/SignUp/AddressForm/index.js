import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storeAddressForm, signUpRequest } from '../../../store/ducks/SignUp';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  state,
  zipcode,
} from '../../validators';
import { SContainer, SInputGroup, SPanel } from './styles';
import SForm from '../../../components/Form';
import SInput from '../../../components/Input';
import SLabel from '../../../components/Label';
import SButton from '../../../components/Button';
import SErrorMessageInput from '../../../components/Form/ErrorMessageInput';

// Yup Fields Schema
const AddressSchema = YupSchema({
  street,
  number,
  neighborhood,
  city,
  state,
  zipcode,
});

const AddressForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userToCreate } = useSelector(state => state.signUp);

  return (
    <SContainer>
      <Formik
        initialValues={userToCreate.address}
        onSubmit={values => {
          const address = values;

          userToCreate.address = address;

          dispatch(storeAddressForm(address));
          dispatch(signUpRequest(userToCreate));

          history.replace('/login');
        }}
        validationSchema={AddressSchema}
      >
        {({ values, ...formikProps }) => {
          const address = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;

          return (
            <SForm onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: 'white', alignSelf: 'center' }}>
                Precisamos anotar os dados do seu endereço :)
              </h2>
              <SPanel>
                <SInputGroup>
                  <SLabel htmlFor="zipcode">CEP</SLabel>
                  <SInput
                    id="zipcode"
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.zipcode}
                    maxLength="8"
                    width="75px"
                    autoFocus
                  />
                  <ErrorMessage
                    name="zipcode"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="street">Rua</SLabel>
                  <SInput
                    id="street"
                    type="text"
                    name="street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.street}
                  />
                  <ErrorMessage
                    name="street"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="neighborhood">Bairro</SLabel>
                  <SInput
                    id="neighborhood"
                    type="text"
                    name="neighborhood"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.neighborhood}
                    width="205px"
                  />
                  <ErrorMessage
                    name="neighborhood"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="number">N°</SLabel>
                  <SInput
                    id="number"
                    type="text"
                    name="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.number}
                    maxLength="10"
                    width="80px"
                  />
                  <ErrorMessage
                    name="number"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="complement">Complemento</SLabel>
                  <SInput
                    id="complement"
                    type="text"
                    name="complement"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.complement}
                    maxLength="14"
                    width="110px"
                  />
                  <ErrorMessage
                    name="complement"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="referenceLocation">
                    Ponto de Referência
                  </SLabel>
                  <SInput
                    id="referenceLocation"
                    type="text"
                    name="referenceLocation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.referenceLocation}
                    maxLength="140"
                  />
                  <ErrorMessage
                    name="referenceLocation"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="city">Cidade</SLabel>
                  <SInput
                    id="city"
                    type="text"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.city}
                    maxLength="120"
                    width="230px"
                  />
                  <ErrorMessage
                    name="city"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="state">Estado</SLabel>
                  <SInput
                    id="state"
                    type="text"
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address.state}
                    maxLength="2"
                    width="35px"
                  />
                  <ErrorMessage
                    name="state"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <SButton
                    width="33%"
                    type="button"
                    onClick={() => history.goBack()}
                  >
                    VOLTAR
                  </SButton>
                  <SButton width="33%" background="#46c787" type="submit">
                    FINALIZAR
                  </SButton>
                </div>
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SContainer>
  );
};

export default AddressForm;
