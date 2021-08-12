export class RegistroModel{
  public nombres: string;
  public apellidos: string;
  public email: string;
  public userName: string;
  public password: string;
  public confirmPassword: string;
}

export class LoginModel{
  public email: string;
  public password: string;
  public clientURI: string;
}

export class UserResponse {
  token: string;
}
