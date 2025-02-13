import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
export default async function Home() {
  const data: Data[] = await getData();
  return (
    <div className="flex flex-col items-center  h-screen m-10">
      <h1 className="text-2xl font-bold">SSR Example</h1>
      <p>
        It is an example of server side rendered because it is using the fetch
        API and there is no force-cache
      </p>
      <Link
        href="/page2"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
      >
        Go to SSG Example
      </Link>
      <Link
        href="/page3"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
      >
        Go to CSR Example
      </Link>
      <Link
        href="/page4"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
      >
        Go to ISR Example
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
