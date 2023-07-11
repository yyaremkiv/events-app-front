import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { EventService } from "../services";
import { IQueryEventParams, IEventDataResponse } from "../interfaces";

interface IUseFetchEventsProps {
  cityName?: string;
  eventName?: string;
  params: IQueryEventParams;
  loadMore?: boolean;
}

interface IInitialData {
  events: [];
  totalEvents: null;
  searchParams: null;
}

const initialDataValues: IInitialData = {
  events: [],
  totalEvents: null,
  searchParams: null,
};

export type TypeFetchEventsResult = [
  IEventDataResponse | IInitialData,
  boolean,
  string | null,
  (props: IUseFetchEventsProps) => Promise<void>
];
export const useFetchEvents = (): TypeFetchEventsResult => {
  const [data, setData] = useState<IEventDataResponse | IInitialData>(
    initialDataValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let cityName = "";
  let eventName = "";
  let loadMore = false;
  const params: IQueryEventParams = { page: 1, limit: 5 };

  const fetchData = async ({
    cityName,
    eventName,
    params,
    loadMore = false,
  }: IUseFetchEventsProps) => {
    setIsLoading(true);
    try {
      let response = null;

      if (params && !cityName) {
        response = await EventService.getEvents({ params });
      }

      if (params && cityName && !eventName) {
        response = await EventService.getEvents({ cityName, params });
      }

      if (cityName && eventName) {
        response = await EventService.getEvents({
          cityName,
          eventName,
          params,
        });
      }

      if (!response) return;

      if (loadMore) {
        setData({
          events: [...data.events, ...response.data.events],
          totalEvents: response.data.totalEvents,
          searchParams: response.data.searchParams,
        });
      } else {
        setData({
          events: response.data.events,
          totalEvents: response.data.totalEvents,
          searchParams: response.data.searchParams,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityName) fetchData({ cityName, eventName, params, loadMore });
  }, [cityName, eventName]);

  return [data, isLoading, error, fetchData];
};
