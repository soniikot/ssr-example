import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 20 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

interface Data {
  id: number;
  title: string;
  body: string;
}
export default async function Page4() {
  const data: Data[] = await getData();
  return (
    <div className="flex flex-col items-center  h-screen m-10">
      <h1 className="text-2xl font-bold">
        Incremental Static Generation (ISG)
      </h1>
      <p className="text-center">
        This is an example of Incremental Static Generation (ISG). By using the
        <code>revalidate</code> option in the fetch call, the data is
        regenerated every 10 seconds when a new request is made after the
        specified time.
      </p>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
      >
        Go to SSR Example
      </Link>
      <Link
        href="/page3"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
      >
        Go to CSR Example
      </Link>
      <Link
        href="/page3"
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
    </div>
  );
}
