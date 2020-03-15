import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultsByGameTitle } from './ResultsByGameTitle';
import { ResultsByUsername } from './ResultsByUsername';
import { Result } from 'typings/result.typings';
import styled from 'styled-components';

export interface Props {
  results: readonly Result[];
}

const FindField = styled.div`
  min-height: 25px;
  max-height: 25px;
  margin: 10px auto;
`;

const Input = styled.input`
  &:active,
  &:focus {
    min-height: 25px;
    max-height: 25px;
  }
`;
export const ResultsList: FC<Props> = (props: Props): ReactElement => {
  const { results } = props;
  const { t } = useTranslation();
  const [sortedBy, setSortedBy] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState<string>(' ');
  const [searchResults, setSearchResults] = React.useState<Result[]>([]);
  React.useEffect(() => {
    setSortedBy('username');
  }, []);

  React.useEffect(() => {
    setSearchResults(
      results.filter(result => {
        return (
          result.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.enteredGame.gameDetails.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [searchTerm]);

  const buttons = ['username', 'gameTitle'];

  const handleSearchFieldChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='results-list'>
      <div className='results-button-row'>
        <span>{t('sortBy')} </span>
        {buttons.map(name => {
          return (
            <button
              disabled={sortedBy === name}
              value={name}
              onClick={() => setSortedBy(name)}
              key={name}
            >
              {t(name)}
            </button>
          );
        })}
        <FindField>
          <span>{t('find')} </span>
          <span>
            <Input
              type='text'
              value={searchTerm}
              onChange={handleSearchFieldChange}
            />
          </span>
        </FindField>
      </div>
      {console.log(searchTerm)}
      {sortedBy === 'username' && (
        <ResultsByUsername
          results={searchTerm !== ' ' ? searchResults : results}
        />
      )}
      {sortedBy === 'gameTitle' && (
        <ResultsByGameTitle results={searchResults ?? results} />
      )}
    </div>
  );
};
