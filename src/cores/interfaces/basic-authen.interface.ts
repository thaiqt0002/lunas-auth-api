export interface IBaseAuthen {
  readonly email: string
  readonly password: string
}

export interface ISignInParams {
  email: string
  password: string
}

export interface ISignUpParams {
  email: string
  fullname: string
  password: string
}

export interface IVerifyTokenParams {
  token: string
}

export interface IGetMeParams {
  uuid: string
}

export interface IGoogleParams {
  email: string
  name: string
}
