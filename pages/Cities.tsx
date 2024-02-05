
import { GetServerSideProps } from "next"; // Copilot
import clientPromise from "../lib/mongodb";
import Papa from "papaparse";
import NoSSR from "../components/no-ssr";

// Copilot
interface City {
  _id: string;
  city: string;
  state_id: string;
  state_name: string;
}

interface CitiesProps {
  cities: City[];
}

export default function Cities({cities}: CitiesProps ) {
 

  // Copilot
  // Declare cities variable here
  let citiesHelper: City[];

  // Stream big file in worker thread

  Papa.parse(new URL("uscities-data.csv"), {
    worker: true,
    step: function (results:City[]) {
      citiesHelper = results.data;
      console.log("Row:", results.data);
    },
    // Use complete callback to assign data to cities variable
    complete: function (results) {
      // citiesHelper = results.data;
      cities = citiesHelper;
    },
  });

  return (
    <div>

      <NoSSR />
      <h1>City</h1>
      <ul>
        {cities.map((city: City) => (
          <li key={city._id}>
            <h2>{city.city}</h2>
            <h2>{city.state_name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Copilot
export const getServerSideProps: GetServerSideProps<CitiesProps> = async (
  context
) => {
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
      props: { cities: JSON.parse(JSON.stringify(cities)) },
    };
  } catch (e) {
    console.error(e);
  }
};
