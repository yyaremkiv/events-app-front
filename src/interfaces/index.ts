export interface IQueryCityParams {
  page?: number;
  limit?: number;
  countries?: string;
  cities?: string;
  showOnHomePage?: boolean;
  showInCityHome?: boolean;
  isHidden?: boolean;
}

export interface IQueryEventParams {
  page?: number;
  limit?: number;
  showOnHomePage?: boolean;
}

export interface ICityDataResponse {
  cities: ICityItem[];
  totalCities: number;
  searchParams: any;
}

export interface IEventDataResponse {
  events: IEventItem[];
  totalEvents: number;
  searchParams: any;
  cityId?: string;
}

//-----------------------------------

export interface ISignupArg {
  username: string;
  email: string;
  password: string;
}

export interface ISigninArg {
  email: string;
  password: string;
}

export interface IQueryParams {
  page?: number;
  limit?: number;
  countries?: string;
  cities?: string;
  showOnHomePage?: boolean;
  showInCityHome?: boolean;
}

export interface ICategoryItem {
  label: string;
  color: string;
}

export interface ICountry {
  code: string;
  label: string;
  phone: string;
}

export interface ICity {
  label: string;
  country: string;
  population: number;
}

export interface ISpeaker {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  about: string;
  email: string;
  topic: string;
  telephone: string;
}

export interface IEventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  seats: number;
  price: number;
  imagePath: string;
  categories: ICategoryItem[];
  speakers: ISpeaker[];
  showOnHomePage: boolean;
  showInCityHome: boolean;
  isHidden: boolean;
}

export interface ICityItem {
  _id: string;
  country: ICountry;
  city: ICity;
  description: string;
  imagePath: string;
  totalEvents: number;
  showOnHomePage: boolean;
  isHidden: boolean;
  events: IEventItem[];
}
