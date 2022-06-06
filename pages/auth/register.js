import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <h3>Registrirajte se</h3>
      <Input label="Ime" />
      <Input label="Email" />
      <Input label="Lozinka" />
      <Input label="Ponovljena lozinka" />
      <div>
        <Link href={"/auth/login"}>
          <a>Imate profil? Prijavite se!</a>
        </Link>
      </div>
      <Button />
    </div>
  );
};

export default RegisterPage;
