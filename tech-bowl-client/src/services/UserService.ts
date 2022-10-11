import axios from 'axios'
import { User } from '../interfaces/User'
import jwt_decode from 'jwt-decode'


const API:string = process.env.REACT_APP_API || ''

export const userRegister = (newUser:User): Promise<any>=> axios.post(`${API}register`, newUser)

export const userLogin = (user:User): Promise<any>=> axios.post(`${API}login`, user)

export const getUserName = ():string =>{
    return (jwt_decode(localStorage.getItem('token') as string) as any).name
}

export const getUserBalance = (): Promise<any>=> axios.get(`${API}user/balance`, {
    headers:{
        Authorization: localStorage.getItem('token') as string
    }
})

export const editUserBalance = (winAmount:number): Promise<any>=> axios.post(`${API}user/balance`, {money:winAmount}, {
    headers:{
        Authorization: localStorage.getItem('token') as string
    }
})
