import Category from "./Category"

interface Product{
    uuid: string,
    name: string,
    description: string,
    imageUrl: string,
    legacyId: number,
    price: number,
    alcoholCount: number,
    soldAlone: boolean,
    availability:string,
    providerAvailability?:string
    category: Category
}

export default Product