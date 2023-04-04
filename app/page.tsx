import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="flex mt-20 flex-col items-center">
        <h1 className="text-3xl">Hello World</h1>
        <p>This is where the magic happens!</p>
      </div>
    </main>
  );
}
