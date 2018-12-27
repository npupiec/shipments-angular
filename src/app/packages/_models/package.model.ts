import { Item } from './item.model';

export class Package {
    streetAddress: string;
    streetNumber: string;
    postalCode: string;
    location: string;
    country: string;
    phoneNumber: string;
    initialTransportDate: Date;
    description: string;
    items: Item[];
    trackingNumber?: string;
    id?: number;
    status: string;
}