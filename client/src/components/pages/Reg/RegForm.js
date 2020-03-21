import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import Form from '../../common/Form/Form';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import RegFormStepper from './RegFormStepper';
import TopProgressLine from '../../common/TopProgressLine';

import {
  FormWrapper,
  FormHeader,
  FormInfo,
  FormFooter,
} from './styled';
import gql from '../../../gql';

const {
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
} = gql;

const RegForm = (props) => {
  const {
    activeStep,
    isCompleted,
    onSuccess,
    onError,
  } = props;
  const [
    signUpAsyncValidationUsername,
    signUpAsyncValidationUsernameResult,
  ] = useMutation(SIGN_UP_ASYNC_VALIDATION);
  const [
    signUpAsyncValidationEmail,
    signUpAsyncValidationEmailResult,
  ] = useMutation(SIGN_UP_ASYNC_VALIDATION);
  const [signUp, signUpResult] = useMutation(SIGN_UP, {
    onCompleted: onSuccess('signUp'),
  });
  const [signUpCompletion, signUpCompletionResult] = useMutation(SIGN_UP_COMPLETION, {
    onCompleted: onSuccess('signUpCompletion'),
  });
  const [signUpBySocial, signUpBySocialResult] = useMutation(SIGN_UP_BY_SOCIAL, {
    onCompleted: onSuccess('signUpBySocial'),
    onError,
  });
  const loading = signUpResult.loading || signUpCompletionResult.loading;
  const asyncFields = {
    username: {
      mutation: signUpAsyncValidationUsername,
      result: signUpAsyncValidationUsernameResult,
    },
    email: {
      mutation: signUpAsyncValidationEmail,
      result: signUpAsyncValidationEmailResult,
    },
  };

  return (
    <FormWrapper elevation={8}>
      <TopProgressLine loading={loading} />
      <FormHeader variant="h1" color="primary" align="center" gutterBottom>
        <RegFormStepper activeStep={activeStep} />
      </FormHeader>
      <Choose>
        <When condition={isCompleted}>
          <FormInfo>
            Your account had been successfuly completed.Check your email and confirm registration.
          </FormInfo>
        </When>
        <When condition={activeStep === 0}>
          <Form
            formId="signUpStepOne"
            asyncFields={asyncFields}
            mutation={signUp}
            result={signUpResult}
            submitButtonText="Confirm"
          />
          <SocialMedia
            mutation={signUpBySocial}
            result={signUpBySocialResult}
          />
        </When>
        <When condition={activeStep === 1}>
          <Form
            formId="signUpStepTwo"
            mutation={signUpCompletion}
            result={signUpCompletionResult}
            submitButtonText="Confirm"
          />
        </When>
        <Otherwise>
          {null}
        </Otherwise>
      </Choose>
      <FormFooter align="center">
        <Link to="/login">I already have a account</Link>
      </FormFooter>
    </FormWrapper>
  );
};

RegForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default RegForm;
