import { LogInUserDataType } from "./User"

export type AuthContextType = { 
  loggedIn: boolean,
  logIn: (data: LogInUserDataType) => void,
  logOut: () => void
}