"use client"

import Image from "next/image";
import HandRecognizer from "@/components/HandRecognizer ";
 export default function Home() {

  const setHandResults = ()=>{
    
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div className="absolute left-3 top-3 z-30 h-400 w-400">
      <HandRecognizer setHandResults={setHandResults} />
     </div>
    </main>
  );
}
