import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
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
export default async function Page2() {
  const data: Data[] = await getData();
  return (
    <div className="flex flex-col items-center  h-screen m-10">
      <h1 className="text-2xl font-bold">
        Static Site Generation (SSG) Example
      </h1>
      <p>
        It is an example of server side generation (at the build time) because
        The use of cache: &quot;force-cache&quot; in the fetch call ensures that
        the data is fetched and cached only once during the build process.
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
