import Input from "../../components/UI/Input/Input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Form, Schema, Button } from "rsuite";
import { authService } from "../../services/authService";
import LoadingScreen from "../../components/UI/LoadingScreen/LoadingScreen";
import TextField from "../../components/FormElements/TextField";

const RegisterPage = () => {
  const [formValue, setFormValue] = useState();
  const router = useRouter();
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        setFormError(null);
        setApiError(null);
      }, 5000);
    }
  }, [apiError, formError]);

  const { StringType } = Schema.Types;

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.log(formError);
      return;
    }
    setIsLoading(true);
    authService
      .register(formValue)
      .then(res => {
        setApiError(res?.response?.data?.message ? "Error" : "");
        setIsLoading(false);
        if (res?.data?.token) {
          router.push("/auth/login");
        }
      })
      .catch(err => console.log(err));
    console.log(formValue, "Form Value");
  };
  return (
    <div
      style={{
        color: "white",
        background: "#00000077",
        padding: "2rem",
        borderRadius: "1rem",
      }}>
      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}>
        <h3>Registrirajte se</h3>
        <TextField label="Ime" name="name" />
        <TextField label="Email" name="email" />
        <TextField label="Lozinka" name="password" type="password" />
        <TextField
          label="Ponovljena lozinka"
          name="password_confirmation"
          type="password"
        />
        {apiError && (
          <>
            <div style={{ color: "red", marginBottom: "2rem" }}>
              {formError}
            </div>
            <div style={{ color: "red", marginBottom: "2rem" }}>{apiError}</div>
          </>
        )}
        <div>
          <Link href={"/auth/login"}>
            <a>Imate profil? Prijavite se!</a>
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

export default RegisterPage;
