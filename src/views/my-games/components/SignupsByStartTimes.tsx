import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { timeFormatter } from 'utils/timeFormatter';
import { Signup, EmptySignup } from 'typings/user.typings';

export interface Props {
  signups: ReadonlyArray<Signup | EmptySignup>;
  startTimes: readonly string[];
}

export const SignupsByStartTimes: FC<Props> = (props: Props): ReactElement => {
  const { signups, startTimes } = props;
  const { t } = useTranslation();

  const getGamesList = (startTime: string) => {
    return signups.map(signup => {
      if (signup.time === startTime) {
        if (!signup.gameDetails) {
          return (
            <GameDetailsList key={signup.time}>
              {t('noSignupResult')}
            </GameDetailsList>
          );
        } else {
          return (
            <GameDetailsList key={signup.gameDetails.gameId}>
              <Link to={`/games/${signup.gameDetails.gameId}`}>
                {signup.gameDetails.title}
              </Link>
            </GameDetailsList>
          );
        }
      }
    });
  };

  const startTimesList = startTimes.map(startTime => {
    return (
      <div key={startTime}>
        <p className='bold'>
          {timeFormatter.weekdayAndTime({ time: startTime, capitalize: true })}
        </p>
        {getGamesList(startTime)}
      </div>
    );
  });

  return <div className='start-times-list'>{startTimesList}</div>;
};

const GameDetailsList = styled.p`
  padding-left: 30px;
`;