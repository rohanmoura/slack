import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
