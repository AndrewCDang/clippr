

export interface  Address {
street: string,
city: string,
post_code: string
}

export interface Service {
name: string,
price: number,
time: number
}

export interface Reviews {
rating: number,
amount: number

}

export interface Subscription{
cost: number,
deal: string
}

export interface WebPage{
bgMain: string,
h2: string,
h3: string,
bgCol:  string,
bgImage: string
}

export interface  BarberItem {
id: number,
first_name: string,
surname: string,
bio: string,
profile: string,
gallery: string[],
mobile_number: number,
address:Address,
service: Service[],
reviews:Reviews,
deals: string[],
subscription:Subscription[],
mentalCare:boolean,
webPage:WebPage,
distance?:number
}

export interface Time {
    hr:number | null;
    min: number | null;
}

export interface BookingTime {
    allDay:string;
    time:Time;
    range: number;
}

