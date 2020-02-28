import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import SForm from '../../../components/Form';
import SInput from '../../../components/Input';
import SLabel from '../../../components/Label';
import YupSchema, { email, password } from '../../validators';
import { SInputGroup, SPanel, SWrapperFormik } from './styles';
import StepNavigator from '../StepNavigator';

// Yup Fields Schema
// const AddressSchema = YupSchema({
//   email,
//   password,
// });

const AddressForm = props => {
  const { createUser, setCreateUser, currentStep, setCurrentStep } = props;

  return (
    <SWrapperFormik>
      <Formik
        initialValues={createUser.address}
        onSubmit={values => {
          const address = values;

          setCreateUser({ ...createUser, address });

          setCurrentStep(currentStep + 1);
        }}
        // validationSchema={AddressSchema}
      >
        {({ values, ...formikProps }) => {
          const address = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;
          const { errors, touched } = formikProps;

          return (
            <SForm onSubmit={handleSubmit}>
              <article>
                <p style={{ color: 'white' }}>
                  E para tornar o FindFitness ainda mais seguro...
                </p>
                <p>precisamos anotar os dados do seu endereço :)</p>
              </article>
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
                    maxLength="9"
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
                    maxLength="15"
                    width="50px"
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
                    maxLength="25"
                    width="120px"
                  />
                  {errors.state && touched.state && errors.state}
                </SInputGroup>

                <StepNavigator
                  buttonNames={['VOLTAR', 'FINALIZAR']}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  typeSubmit
                />
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SWrapperFormik>
  );
};

AddressForm.propTypes = {
  createUser: PropTypes.object.isRequired,
  setCreateUser: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default AddressForm;
