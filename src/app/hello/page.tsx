import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex  flex-col items-center justify-between p-24">
      hello page
    </div>
  );
}
