import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { submitRegistration } from 'views/registration/registrationActions';
import RegistrationForm from 'views/registration/components/RegistrationForm';

export const RegistrationView: FC<{}> = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submit = async (form): Promise<void> => {
    let response;
    try {
      response = await dispatch(submitRegistration(form));
    } catch (error) {
      console.log(`submitRegistration error:`, error);
    }

    if (response && response.code === 11) {
      throw new SubmissionError({
        username: t('error.usernameTaken'),
      });
    } else if (response && response.code === 12) {
      throw new SubmissionError({
        serial: t('error.invalidSerial'),
      });
    }
  };

  return (
    <div className='registration-view'>
      <RegistrationForm onSubmit={submit} />
    </div>
  );
};
