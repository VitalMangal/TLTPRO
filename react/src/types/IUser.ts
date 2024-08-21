export interface IUserResponse {
  id: number,
  email: string,
  password: string,
  roles: number[],
}

// учесть ошибку
export interface IUserRequest {
  email: string,
  password: string,
}