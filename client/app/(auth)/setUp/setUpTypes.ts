
type cutInterface = {
    cutName: string;
    cutPrice: number;
    cutDuration: number;
    objectId: number;
    
}

export type AddressInterface = {
    studio: string;
    addressline1: string;
    addressline2: string;
    addressline3: string;
    city: string;
    postcode: string;
}

export interface UserDetails {
    accountType: string;
    barberLevel: string;
    ethnicType: string[];
    hairServices: cutInterface[];
    appointmentLocation: string;
    imageUploads: File[];
    profilePicture: string;
    userAddress: AddressInterface;
}