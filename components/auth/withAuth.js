import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuth = Component => {
  const Auth = props => {
    const [cookie, setCookie] = useCookies(["token"]);
    const router = useRouter();
    const login = cookie.token;
    useEffect(() => {
      if (!login) {
        router.push("/auth/login");
      }
    });

    return login ? <Component {...props} /> : "";
  };

  return Auth;
};

export default WithAuth;
