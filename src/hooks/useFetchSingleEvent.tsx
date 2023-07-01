import { useState, useEffect } from "react";
import { EventService } from "../services";
import { IEventItem } from "../interfaces";

interface IUseFetchDataProps {
  cityName: string;
  eventName: string;
}

export type TypeFetchSingleEventResult = [
  IEventItem | null,
  boolean,
  string | null,
  (props: IUseFetchDataProps) => Promise<void>
];

export const useFetchSingleEvent = (): TypeFetchSingleEventResult => {
  const [data, setData] = useState<IEventItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let cityName = "";
  let eventName = "";

  const fetchData = async ({ cityName, eventName }: IUseFetchDataProps) => {
    setIsLoading(true);
    try {
      const { data } = await EventService.getSingleEvent({
        cityName,
        eventName,
      });

      setData(data.event);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityName && eventName) fetchData({ cityName, eventName });
  }, [cityName, eventName]);

  return [data, isLoading, error, fetchData];
};
