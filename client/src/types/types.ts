export type FieldsType = {
    name: string;
    room: string;
}


export type UserType = {
    name:string,
    message:string
}
export type StateTypeFromServer = {
    user:UserType
    message:string
}
