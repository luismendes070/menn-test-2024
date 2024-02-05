import clientPromise from "../lib/mongodb";
import Papa from "papaparse";
export default function Cities({cities}) {

// Stream big file in worker thread

Papa.parse("uscities-data.csv", {
	worker: true,
	step: function(results) {
		console.log("Row:", results.data);
	}
});


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
