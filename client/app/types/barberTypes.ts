

export interface  Address {
street: string,
city: string,
post_code: string
}

export interface Service {
cutName: string,
cutPrice: number,
cutDuration: number
}

export interface Reviews {
    rating: number,
    amount: number
}

export interface ReviewsTable {
    id:string,
    customer_id:string,
    barber_id:string,
    review:string,
    stars: number,
    created_at: Date,
}

export interface Subscription{
cost: number,
}

export interface WebPage{
bgMain: string,
h2: string,
h3: string,
bgCol:  string,
bgImage: string
}

type UserAddress ={
    studio?:string;
    city:string,
    postcode:string,
    addressline1:string,
    addressline2?:string,
    addressline3?:string
}

export type cutClickType = {
    cutName?:string|null;
    cutPrice:number|null;
    cutDuration:number;
  }

export type selectedDateType = {
    month: number | null;
    date: number | null;
    year: number | null;
    day: number | null;
  };
  

export  type barberFormTypes = {
    cutDetails: cutClickType;
    selectedDate: selectedDateType | null;
    selectedTime: string[] | null
}

export type ReviewObject = {
    ReviewsTable: ReviewsTable[]
}

export type barberAppointmentTypes = {
    id:string,
    created_at:Date,
    user_id:string,
    barber_id:string,
    cut_price:number,
    cut_name:number,
    cut_duration:number,
    cut_date:Date,
    review_id:string,
    upcoming:boolean,
    cut_time:string[],
    cancelled:boolean,
    BarberTable?:BarberItem,
    UserTable?: ReviewObject | UserItem,

}

export type WeeklySchedule = any;

export type UserItem = {
    email:string;
    id: string;
    first_name: string;
    mobile_number: number;
    last_name: string;
    account_type: string;
    set_up:boolean;
    country_code:number;
    dob:string;
    profilePicture: string;
    auth_id:string;
}

export type HomeUserTypes = {
    email:string;
    id: string;
    first_name: string;
    mobile_number: number;
    last_name: string;
    account_type: string;
    set_up:boolean;
    country_code:number;
    dob:string;
    profilePicture: string;
    auth_id:string;
    AppointmentsTable: barberAppointmentTypes[]
}

type WebStyle = {
    bannerUrl:string;
    backgroundUrl:string;
}
type Deals = {
    description:string,
    discount:number,
    days:string
}

export interface  BarberItem {
id: string,
first_name: string,
surname: string,
bio: string,
web_style: WebStyle,
profile: string,
gallery: string[],
mobile_number: number,
address:Address,
service: Service[],
ethnic_type: string[],
deals:Deals[],
subscription:Subscription,
barber_level:string,
appointment_location:string,
user_address:UserAddress,
reviews:Reviews,
email:string,
city:string,
images:string[],
weekly_schedule:WeeklySchedule[],
reviews_stars:number,
UserTable?:UserItem,
profile_url:string,
ReviewsTable?:ReviewsTable[]
mentalCare?:boolean,
lat:number,
lng:number,

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

