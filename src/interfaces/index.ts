export interface ISignupArg {
  username: string;
  email: string;
  password: string;
}

export interface ISigninArg {
  email: string;
  password: string;
}

export interface ICityData {
  _id: string;
  city: string;
  country: string;
  events: [];
  imagePath: string;
  population: number;
  showOnHomePage: boolean;
  title: string;
  totalEvents: number;
  upcomingEvent: any;
  __v: number;
}

export interface IEventItem {
  _id: string;
  city: string;
  country: string;
  events: [];
  imagePath: string;
  population: number;
  showOnHomePage: boolean;
  title: string;
  totalEvents: number;
  upcomingEvent: any;
  __v: number;
}
