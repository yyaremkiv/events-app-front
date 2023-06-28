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
  params: {
    page?: number;
    limit?: number;
    countries?: string;
    cities?: string;
    showOnHomePage?: boolean;
  };
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
}

export interface IEventItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  date: string;
  seats: number;
}
