
import { GetServerSideProps } from "next"; // Copilot
import clientPromise from "../lib/mongodb";
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

export default async function Cities({cities}: CitiesProps ) {

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

// next-with-mongodb sample
export async function getServerSideProps(context:any) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise
    const db = client.db("menn_test_2024")
    //
    // Then you can execute queries against your database like so:
    // db.find({}).toArray() as City[] // or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

