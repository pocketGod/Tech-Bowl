export interface Cart{
    _id?:string,
    userID:string,
    items: [{
        itemID:string,
        amount:number
    }]
}