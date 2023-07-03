import { useState, useEffect } from "react";
import { IEventItem, IQueryParams } from "../interfaces";
import { EventService } from "../services";

interface IEventsData {
  events: IEventItem[];
  totalEvents: number;
}

interface IUseFetchEventsProps {
  cityName?: string;
  params: IQueryParams;
  loadMore?: boolean;
}

export type TypeFetchEventsResult = [
  IEventsData | null,
  boolean,
  string | null,
  (props: IUseFetchEventsProps) => Promise<void>
];

export const useFetchEvents = (): TypeFetchEventsResult => {
  const [data, setData] = useState<IEventsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let cityName = "";
  let loadMore = false;
  const params = { page: 1, limit: 5 };

  const fetchData = async ({
    cityName,
    params,
    loadMore = false,
  }: IUseFetchEventsProps) => {
    setIsLoading(true);
    try {
      const response = cityName
        ? await EventService.getEvents({ cityName, params })
        : await EventService.getAllEvents(params);

      if (loadMore && data) {
        setData({
          events: [...data.events, ...response.data.cities],
          totalEvents: response.data.totalEvents,
        });
      } else {
        setData({
          events: response.data.events,
          totalEvents: response.data.totalEvents,
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityName) fetchData({ cityName, params, loadMore });
  }, [cityName]);

  return [data, isLoading, error, fetchData];
};
