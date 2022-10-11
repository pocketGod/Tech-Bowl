import axios from 'axios'
import { Item } from '../interfaces/Item'
import  _ from 'lodash'

const API:string = process.env.REACT_APP_API || ''


export const getAllItems = () :Promise<any> =>{
    return axios.get(`${API}item`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}

export const getOneItem = (ID:string):Promise<any> =>{
    return axios.get(`${API}item/${ID}`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}

export const getCategoriesArr = ()=>{
    return axios.get(`${API}item/categories`, {
        headers:{
            Authorization: localStorage.getItem('token') as string
        }
    })
}

