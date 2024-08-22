import { LogInUserDataType } from "./User"


//поменять тип useState
export type AuthContextType = { 
  loggedIn: boolean,
  logIn: (data: LogInUserDataType) => void,
  logOut: () => void
}