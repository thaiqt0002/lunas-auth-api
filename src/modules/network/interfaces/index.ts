import { ENetwork } from '~/cores/constants'
import { UuidDto } from '~/cores/dtos/uuid.dto'

export interface IFindByUserIdProps {
  uuid: UuidDto
  type?: ENetwork
}
