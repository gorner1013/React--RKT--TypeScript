export interface UserType{
    username: string,
    email?: string,
    password: string,
    confirm?: string,

}

export interface ProductType{
    name: string,
    description: string,
    image: string,
    price: string,
    owner?:string
}

