import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const useAuth = (Component: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const isLogged = useSelector((state: any) => state.auth.isLogged);

    useEffect(() => {
      if (!isLogged) {
        router.push("/login");
      } else {
        router.push("/admin");
      }
    }, [isLogged]);

    return (
      <div>
        <Component {...props} />
      </div>
    );
  };

  return Wrapper;
};
