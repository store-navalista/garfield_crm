import { TServices } from './pages'

export type TServicesObjectProps = {
   [key in TServices]: {
      [key: string]: string
   }
}
