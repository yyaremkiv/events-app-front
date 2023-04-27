import Image from "next/image";
import Link from "next/link";

const EvantsPage = ({ data }) => {
  return (
    <div>
      <h1>Event Page</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} width={600} height={300} />
            <h2>{ev.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EvantsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
