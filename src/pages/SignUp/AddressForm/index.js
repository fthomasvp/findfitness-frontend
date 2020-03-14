import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddressForm } from '../../../store/ducks/SignUp';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  state,
  zipcode,
} from '../../validators';
import SForm from '../../../components/Form';
import SInput from '../../../components/Input';
import SLabel from '../../../components/Label';
import SButton from '../../../components/Button';
import { SInputGroup, SPanel, SWrapperFormik } from './styles';

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
    <SWrapperFormik>
      <Formik
        initialValues={userToCreate.address}
        onSubmit={values => {
          const address = values;

          dispatch(updateAddressForm(address));

          history.replace('/login');
        }}
        validationSchema={AddressSchema}
      >
        {({ values, ...formikProps }) => {
          const address = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;
          const { errors, touched } = formikProps;

          return (
            <SForm onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
              <h1 style={{ color: 'white', alignSelf: 'center' }}>
                Para tornar o FindFitness ainda mais seguro...
              </h1>
              <h3 style={{ color: 'white', alignSelf: 'center' }}>
                Precisamos anotar os dados do seu endereço ;-)
              </h3>
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
                  {errors.zipcode && touched.zipcode && errors.zipcode}
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
                  {errors.street && touched.street && errors.street}
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
                  {errors.neighborhood &&
                    touched.neighborhood &&
                    errors.neighborhood}
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
                  {errors.number && touched.number && errors.number}
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
                  {errors.complement && touched.complement && errors.complement}
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
                  {errors.referenceLocation &&
                    touched.referenceLocation &&
                    errors.referenceLocation}
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
                  {errors.city && touched.city && errors.city}
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
                  {errors.state && touched.state && errors.state}
                </SInputGroup>

                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <SButton
                    width="40%"
                    type="button"
                    onClick={() => history.goBack()}
                  >
                    VOLTAR
                  </SButton>
                  <SButton width="40%" backgroundColor="blue" type="submit">
                    FINALIZAR
                  </SButton>
                </div>
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SWrapperFormik>
  );
};

export default AddressForm;
