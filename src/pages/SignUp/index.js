import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignIn from '../SignIn';
import AddressForm from './AddressForm';
import ProfileForm from './ProfileForm';
import StudentOrPersonalForm from './StudentOrPersonalForm';


const SignUp = () => {
  const history = useHistory();

  const [currentStep, setCurrentStep] = useState(1);
  const [createUser, setCreateUser] = useState({
    profileType: 'STUDENT',
    personal: {
      name: '',
      cref: '',
      phone: '',
      cpf: '',
      password: '',
      gender: '',
      birthdate: '',
      email: '',
    },
    student: {
      name: '',
      phone: '',
      cpf: '',
      password: '',
      gender: '',
      birthdate: '',
      email: '',
    },
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      referenceLocation: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });

  useEffect(() => {
    if (currentStep === 4) {
      history.replace('/login');
    }
  }, [currentStep, history]);

  switch (currentStep) {
    case 1: {
      return (
        <ProfileForm
          currentStep={currentStep}
          createUser={createUser}
          setCreateUser={setCreateUser}
          setCurrentStep={setCurrentStep}
        />
      );
    }

    case 2: {
      return (
        <StudentOrPersonalForm
          createUser={createUser}
          setCreateUser={setCreateUser}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      );
    }

    case 3: {
      return (
        <AddressForm
          createUser={createUser}
          setCreateUser={setCreateUser}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      );
    }

    default:
      return <SignIn />;
  }
};

export default SignUp;
