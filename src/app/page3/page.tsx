"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Data {
  id: number;
  title: string;
  body: string;
}
export default function Page3() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center  h-screen m-10">
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            Client Side Rendering (CSR) Example
          </h1>
          <p>
            It is an example of client side rendering because the data is
            fetched and rendered on the client side.
          </p>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
          >
            Go to SSR Example
          </Link>
          <Link
            href="/page2"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
          >
            Go to SSG Example
          </Link>
          <div>
            {data.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
