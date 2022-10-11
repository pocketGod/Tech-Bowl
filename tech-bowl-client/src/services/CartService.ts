import axios from 'axios'
import _ from 'lodash'
import { Item } from '../interfaces/Item'

const API:string = process.env.REACT_APP_API || ''


export const getUserCart = ():Promise<any> =>{
    return axios.get(`${API}cart`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}
export const getBriefedCart = ():Promise<any> =>{
    return axios.get(`${API}cart/brief`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}
export const addItemToCart = (itemID:string) :Promise<any> =>{
    return axios.post(`${API}cart`, {itemID:itemID},{
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}
export const removeInstanceOfItemFromCart = (itemID:string) :Promise<any> =>{
    return axios.post(`${API}cart/remove-instance`, {itemID:itemID},{
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}
export const removeItemFromCart = (itemID:string) :Promise<any> =>{
    return axios.post(`${API}cart/remove-item`, {itemID:itemID},{
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}


