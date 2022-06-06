import Link from "next/link";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="left">
        <Link href="/" className="login-link">
          (LOGO)
        </Link>
        {/* <ul>
          <li>Features</li>
          <li>Comunity</li>
          <li>Support</li>
        </ul> */}
      </div>
      <Link href="/auth/login" className="login-link">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
