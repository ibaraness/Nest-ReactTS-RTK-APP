interface RawCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface RawGeo {
    lat: string;
    lng: string;
}

interface RawAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: RawGeo;
}

export interface RawResourceUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: RawAddress;
    phone: string;
    website: string;
    company: RawCompany;
}