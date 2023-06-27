export interface ISignupArg {
  username: string;
  email: string;
  password: string;
}

export interface ISigninArg {
  email: string;
  password: string;
}

export interface ICountry {
  label: string;
  code: string;
}

export interface ICity {
  label: string;
  country: string;
  population: number;
}

export interface ICityItem {
  _id: string;
  country: ICountry;
  city: ICity;
  events: [];
  imagePath: string;
  population: number;
  showOnHomePage: boolean;
  title: string;
  totalEvents: number;
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
