import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const useAuth = (Component) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isLogged = useSelector((state) => state.auth.isLogged);

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
