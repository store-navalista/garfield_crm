import { jwtDecode } from 'jwt-decode'

export const decodeToken = (token: string) => {
   try {
      return jwtDecode<{ id: string; describe_name: string; describe_role: string }>(token)
   } catch (error) {
      console.error('Invalid access_token')
      return null
   }
}
