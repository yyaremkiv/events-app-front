import { useState, useEffect } from "react";
import { EventService } from "../services";
import { IEventItem } from "../interfaces";

export interface IUseFetchHomeEvent {
  data: IEventItem[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchHomeEvent = (): IUseFetchHomeEvent => {
  const [data, setData] = useState<IEventItem[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await EventService.getCitiesToHomePage();
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
