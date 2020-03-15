import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { timeFormatter } from 'utils/timeFormatter';
import { Game } from 'typings/game.typings';

export interface Props {
  games: readonly Game[];
}

export const AllGamesList: FC<Props> = (props: Props): ReactElement => {
  const { games } = props;
  const { t } = useTranslation();

  const buildGamesList = games => {
    const sortedGames = _.sortBy(games, [
      game => game.startTime,
      game => game.title.toLowerCase(),
    ]);

    const groupedGames = _.groupBy(sortedGames, 'startTime');

    const GamesList = [];

    for (const [startTime, games] of Object.entries(groupedGames)) {
      const formattedStartTime = timeFormatter.weekdayAndTime({
        time: startTime,
        capitalize: true,
      });
      const signupStartTime = timeFormatter.startTime(startTime);
      const signupEndTime = timeFormatter.endTime(startTime);

      // @ts-ignore
      const allGamesRevolvingDoor = games.every(game => game.revolvingDoor);

      const title = (
        <GameListTitle key={startTime}>
          <span className='game-startup-time'>{formattedStartTime}</span>
          {!allGamesRevolvingDoor && (
            <span className='game-signup-time'>
              {' '}
              ({t('signupOpenBetween')} {signupStartTime}-{signupEndTime})
            </span>
          )}
        </GameListTitle>
      );

      // @ts-ignore
      GamesList.push(title);

      // @ts-ignore
      for (const game of games) {
        const gameEntry = (
          <div key={game.gameId} className='games-list'>
            <Link to={`/games/${game.gameId}`}>{game.title}</Link>{' '}
            <GameListShortDescription>
              {t(`programType.${game.programType}`)}:{' '}
              {game.shortDescription ? game.shortDescription : game.gameSystem}
            </GameListShortDescription>
          </div>
        );

        // @ts-ignore
        GamesList.push(gameEntry);
      }
    }

    return GamesList;
  };

  const GamesList = buildGamesList(games);

  return (
    <div className='games-list'>
      {games.length === 0 && <h3>{t('noProgramItemsAvailable')}</h3>}
      {games.length !== 0 && <>{GamesList}</>}
    </div>
  );
};

const GameListTitle = styled.h3`
  margin: 20px 0;
`;

const GameListShortDescription = styled.p`
  font-size: ${props => props.theme.fontSizeSmall};
  font-style: italic;
  margin: 4px 0 8px 14px;
`;