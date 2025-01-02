import { ENetwork } from '~/cores/constants'

export interface IBaseNetwork {
  id: number
  network: ENetwork
  userUuid: string
}
