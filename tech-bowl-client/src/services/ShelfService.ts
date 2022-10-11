import axios from 'axios'
import _ from 'lodash'
import { Item } from '../interfaces/Item'

const API:string = process.env.REACT_APP_API || ''


export const getUserShelf = ():Promise<any> =>{
    return axios.get(`${API}shelf`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}
export const checkout = (moneyLeft:number) :Promise<any> =>{
    return axios.post(`${API}shelf`, {moneyLeft:moneyLeft},{
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}