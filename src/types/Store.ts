interface Store{
    uuid: string,
    name: string,
    availabilityState: string,
    providers?: string[],
    face_to_face?: boolean,
    config?: object,
    secret: string,
    legacyId?: string,
    organizationUuid: string
}

export default Store