import Store from "./Store"

interface User{
    uuid: string,
    email: string,
    stores: Store[],
    tokens?: any,
    username: string
}

export default User