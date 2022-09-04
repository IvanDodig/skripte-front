import Link from "next/link";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import { Dropdown } from "rsuite";

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
          <div className="hide-over-1000">
            <Dropdown title="Menu">
              {loginUser.roles.find(x => x.name === "admin") && (
                <Dropdown.Item eventKey="a">
                  <Link href="/administration" className="login-link">
                    Administracija
                  </Link>
                </Dropdown.Item>
              )}
              <Dropdown.Item eventKey="b">
                <Link href="/myscripts" className="login-link">
                  Moje skripte
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="c">
                <div
                  onClick={() => {
                    removeCookie("loginUser");
                    removeCookie("token");
                    setLoginUser(null);
                  }}>
                  Odjava
                </div>
              </Dropdown.Item>
            </Dropdown>
          </div>

          {loginUser.roles.find(x => x.name === "admin") && (
            <div className="hide-under-1000">
              <Link href="/administration" className="login-link ">
                Administracija
              </Link>
            </div>
          )}
          <div className="hide-under-1000">
            <Link href="/myscripts" className="login-link">
              Moje skripte
            </Link>
          </div>
          <div
            className="hide-under-1000"
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
