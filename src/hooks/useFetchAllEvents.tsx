import { useState, useEffect } from "react";
import { EventService } from "../services";

export const useFetchAllEvents = ({ params }: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let loadMore = false;

  const fetchData = async ({ params, loadMore = false }: any) => {
    setIsLoading(true);
    try {
      const response = await EventService.getAllEvents(params);

      if (loadMore && data) {
        setData({
          events: [...data, ...response.data.events],
        });
      } else {
        setData({
          events: response.data.events,
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
