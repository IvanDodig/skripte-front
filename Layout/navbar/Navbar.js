import Link from "next/link";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { loginUser, setLoginUser } = useContext(AuthContext);
  const [cookie, setCookie, removeCookie] = useCookies(["loginUser", "token"]);

  console.log(loginUser);
  return (
    <nav id="navbar">
      <div className="left">
        <Link href="/" className="login-link">
          ONLINE SKRIPTARNICA
        </Link>
        {/* <ul>
          <li>Features</li>
          <li>Comunity</li>
          <li>Support</li>
        </ul> */}
      </div>

      {loginUser && (
        <div style={{ display: "flex", gap: "1rem" }}>
          {loginUser.roles.find(x => x.name === "admin") && (
            <Link href="/administration" className="login-link">
              Administracija
            </Link>
          )}
          <Link href="/myscripts" className="login-link">
            Moje skripte
          </Link>
          <div
            onClick={() => {
              removeCookie("loginUser");
              removeCookie("token");
              setLoginUser(null);
            }}>
            Odjava
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
