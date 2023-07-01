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

export interface IEventItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  date: string;
  seats: number;
  showOnHomePage: boolean;
  isHidden: boolean;
  showInCityHome: boolean;
  categories: ICategoryItem[];
}

export interface ICityItem {
  _id: string;
  country: ICountry;
  city: ICity;
  title: string;
  imagePath: string;
  showOnHomePage: boolean;
  isHidden: boolean;
  events: IEventItem[] | [];
}
