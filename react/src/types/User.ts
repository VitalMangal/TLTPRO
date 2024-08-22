// учесть ошибку
export type UserRequestType = {
  email: string,
  password: string,
}

export type UserResponseType = {
  token: string, 
  user: {
    id: number,
    email: string,
    password: string,
    roles: number[],
  }
}

export type LogInUserDataType = {
  token: string;
  user: {
      id: number;
      email: string;
      roles: number[];
  };
  userLoggedIn: boolean;
}

