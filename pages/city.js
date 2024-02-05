import clientPromise from "../lib/mongodb";

export default function Cities({cities}) {
  return (
    <div>
      <h1>City</h1>
      <ul>
        {cities.map((city) => (
          <li>
            <h2>{city.city}</h2>
            <h2>{city.state_name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("menn_test_2024");

    const cities = await db
      .collection("menn_test_2024_Collection")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(cities)) },
    };
  } catch (e) {
    console.error(e);
  }
}
