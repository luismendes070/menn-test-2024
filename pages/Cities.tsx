import fs from "fs";
import csvParser from "csv-parser";
import next, { GetServerSideProps } from "next"; // Copilot
import clientPromise from "../lib/mongodb";
// import NoSSR from "../components/no-ssr";
import { useEffect } from "react";

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

export default async function Cities({ cities }: CitiesProps) {
  // Bard
  useEffect(() => {
    const fetchData = async () => {
      try {
        getServerSideProps(next, cities);
      } catch (error: any) {
        console.log(error.message);

        // Copilot https://stackoverflow.com/questions/47504868/catch-504-gateway-timeout-error-in-react-javascript
        return getItemsByName(operand:any, trimmedValue:any)
          .then((result:any) => (combinedResults:any = [].concat(result)))
          .then(() => getItemsByCode(operand, trimmedValue))
          .then((result:any) => (combinedResults:any = combinedResults.concat(result)))
          .catch((error:any) => {
            if (error.response) {
              // if there is response, it means its not a 50x, but 4xx
            } else {
              // gets activated on 50x errors, since no response from server
              // do whatever you want here :)
            }
          });
      } // end catch block
    };

    fetchData();

    // Implement file change watcher or API call as needed
  }, []);

  return (
    <div>
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
export async function getServerSideProps(context: any, cities: City[]) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise;
    const db = client.db("menn_test_2024");
    //
    // Then you can execute queries against your database like so:
    // db.find({}).toArray() as City[] // or any of the MongoDB Node Driver commands

    fs.createReadStream("../uscities-data.csv")
      .pipe(csvParser())
      .on("data", async (row: { id: any; name: any; children: any }) => {
        // Assuming your CSV has columns: id, name, children
        const { id, name, children } = row;

        // Convert children string to an array
        cities = children.split(",").map((child: string) => child.trim());
        // const childrenArray = children.split(',').map((child: string) => child.trim());

        // cities = childrenArray;

        // Insert data into MongoDB
        // await collection.insertOne({ id, name, children: childrenArray });

        client.close();
      })
      .on("end", () => {
        console.log("CSV data imported successfully");
      });

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
function getItemsByName(operand: any, any: any, trimmedValue: any, any1: any) {
  throw new Error("Function not implemented.");
}

function getItemsByCode(operand: any, trimmedValue: any) {
  throw new Error("Function not implemented.");
}

