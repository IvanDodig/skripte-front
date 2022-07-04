import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Form, Schema } from "rsuite";
import TextField from "../../components/FormElements/TextField";
import LoadingScreen from "../../components/UI/LoadingScreen/LoadingScreen";
import { AuthContext } from "../../contexts/AuthContext";
import { authService } from "../../services/authService";

const LoginPage = () => {
  const { setLoginUser } = useContext(AuthContext);
  const router = useRouter();
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [apiError, setApiError] = useState(null);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [cookie, setCookie] = useCookies(["token", "loginUser"]);

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    email: StringType()
      .isRequired("Ovo polje je obavezno")
      .isEmail("Molimo unesite važeću email adresu"),
    password: StringType().isRequired("Ovo polje je obavezno"),
  });
  useEffect(() => {
    console.log(cookie.token);
    if (apiError) {
      setTimeout(() => setApiError(null), 5000);
    }
  }, [apiError]);

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    setIsLoading(true);
    authService
      .login(formValue)
      .then(res => {
        setApiError(res?.response?.data?.message || "");
        setIsLoading(false);
        if (res?.data?.token) {
          console.log(res.data.token);
          setCookie("token", res.data.token, {
            maxAge: 3600, // Expires after 1hr
          });
          setCookie("loginUser", res.data.user);
          setLoginUser(res.data.user);
          router.push("/");
        }
      })
      .catch(err => console.log(err));
    console.log(formValue, "Form Value");
  };

  return (
    <div>
      <h3>Prijavite se</h3>

      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={model}>
        <TextField name="email" label="Email" />
        <TextField name="password" label="Lozinka" type="password" />

        {apiError && (
          <div style={{ color: "red", marginBottom: "2rem" }}>{apiError}</div>
        )}
        <div>
          <Link href={"/auth/register"}>
            <a>Nemate profil? Registrirajte se!</a>
          </Link>
        </div>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          style={{ width: "8rem" }}>
          {isLoading ? <LoadingScreen /> : "Prijavi se"}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
