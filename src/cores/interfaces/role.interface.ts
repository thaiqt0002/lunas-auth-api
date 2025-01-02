import { ERole } from './base.interface'

export interface IBaseRole {
  id: number
  name: ERole
}

export interface ICreateRoleParams {
  name: ERole
}
