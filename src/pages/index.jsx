import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { HomePage } from "@/components/Home/Home-page";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <>
      <header>
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            padding: "1rem",
          }}
        >
          <img />
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/about-us">About Us</Link>
        </nav>
      </header>
      <HomePage data={data} />
      <footer>
        <p>&#169; 2022 - A Project Built with Next.js</p>
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
