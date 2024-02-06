
import { GetServerSideProps } from "next"; // Copilot
import {client} from "../sanity";
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

// Copilot
export const getServerSideProps: GetServerSideProps<CitiesProps> = async (
  context
) => {
  try {
    const query = `* [_type == "collection"] {
      _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage {
        asset
      },
      previewImage {
        asset
      },
      slug {
        current
      },
      creator -> {
        _id,
        name,
        address,
        slug {
          current
        },
      },
    }`;

    const collections = await client.fetch(query);

    return {
      props: {
        collections,
      },
    };
  } catch (err) {
    // handle the error and return a proper object
    return {
      notFound: true, // or redirect: { destination: "/error" }
    };
  }
};

