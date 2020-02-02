import { Game } from 'typings/game.typings';
import { GroupMember } from 'typings/group.typings';
import { Signup, UserGroup } from 'typings/user.typings';
import { Result } from 'typings/result.typings';

export interface AdminState {
  hiddenGames: readonly Game[];
  signupTime: string;
  testTime: string;
  appOpen: boolean;
}

export interface AllGamesState {
  games: readonly Game[];
}

export interface LoginState {
  username: string;
  loggedIn: boolean;
  jwt: string;
  userGroup: UserGroup;
  serial: string;
  groupCode: string;
  groupMembers: readonly GroupMember[];
}

export interface MyGamesState {
  enteredGames: readonly Signup[];
  favoritedGames: readonly Game[];
  signedGames: readonly Signup[];
}

export interface ResultsState {
  result: readonly Result[];
  startTime: string;
}

export interface SignupState {
  signupTime: string;
  selectedGames: readonly Signup[];
  unsavedChanges: boolean;
}

export interface LocalStorageState {
  login: { jwt: string };
}

export interface RootState {
  admin: AdminState;
  allGames: AllGamesState;
  login: LoginState;
  myGames: MyGamesState;
  results: ResultsState;
  signup: SignupState;
}
