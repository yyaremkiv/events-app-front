import { useState, useEffect } from "react";
import { EventService } from "../services";
import { IEventItem } from "../interfaces";

interface IFetchDataProps {
  page?: number;
  limit?: number;
}

interface ICitiesData {
  cities: IEventItem[];
  totalCities: number;
}

export type FetchCitiesResult = [
  ICitiesData,
  boolean,
  string | null,
  (props: IFetchDataProps) => Promise<void>
];

export const useFetchCities = ({
  page = 1,
  limit = 5,
}: IFetchDataProps): FetchCitiesResult => {
  const [data, setData] = useState<ICitiesData>({ cities: [], totalCities: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ page = 1, limit = 5 }: IFetchDataProps) => {
    setIsLoading(true);
    try {
      const response = await EventService.getCities({ page, limit });
      setData({
        cities: response.data.cities,
        totalCities: response.data.totalCities,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ page, limit });
  }, [page, limit]);

  return [data, isLoading, error, fetchData];
};
