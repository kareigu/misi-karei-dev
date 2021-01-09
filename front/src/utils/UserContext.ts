import { createContext } from 'react';

export type TUserContextFormat = {
  permLevel: number,
  username: string,
  avatar: string,
  logged: boolean
}

export const DefaultUser = {
  permLevel: 0,
  username: 'Guest',
  avatar: '',
  logged: false
};

type UserState = {
  user: TUserContextFormat;
  setUser?: React.Dispatch<React.SetStateAction<TUserContextFormat>>;
}


const UserContext = createContext<UserState>({user: DefaultUser});

export default UserContext;