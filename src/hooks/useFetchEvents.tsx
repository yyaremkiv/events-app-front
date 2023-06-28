import { useState, useEffect } from "react";
import { IEventItem, IQueryParams } from "../interfaces";
import { EventService } from "../services";

interface IEventsData {
  events: IEventItem[];
  totalEvents: number;
}

interface IUseFetchEventsProps {
  cityName: string | null;
  params?: IQueryParams["params"];
  loadMore?: boolean;
}

export type TypeFetchEventsResult = [
  IEventsData,
  boolean,
  string | null,
  (props: IUseFetchEventsProps) => Promise<void>
];

export const useFetchEvents = ({
  cityName,
  params,
  loadMore = false,
}: IUseFetchEventsProps): TypeFetchEventsResult => {
  const [data, setData] = useState<IEventsData>({ events: [], totalEvents: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ params, loadMore }: IUseFetchEventsProps) => {
    setIsLoading(true);
    try {
      if (!cityName) return;
      const response = await EventService.getEvents({ cityName, params });

      if (loadMore) {
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
    fetchData({ params, loadMore });
  }, []);

  return [data, isLoading, error, fetchData];
};
