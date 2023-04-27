import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo_black.png";
import css from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.topNav}>
        <Image src={logo} width={50} height={50} alt="logo" />
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1>Sed ut perspiciatis unde omnis iste.</h1>
    </header>
  );
};
