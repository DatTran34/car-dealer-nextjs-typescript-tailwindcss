import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { GetServerSideProps } from "next";
import { ICar } from "../components/Types/model";
////{ cars }: { cars: ICar[] }
function adminPage() {

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto py-4">
        <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-6 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-6 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-6 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
                <Textarea label="Message" />
            </div>
          </div>
          <div className="md:col-span-3 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
          <div className="md:col-span-3 space-y-4">
            <div>Product Name</div>
            <div className="w-full">
              <Input label="Username" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims");
//   const data = await JSON.stringify(res.json()).slice(11,JSON.stringify(res.json()).length - 3)
//   console.log(await JSON.stringify(res.json()).slice(11,JSON.stringify(res.json()).length - 3))
//   const cars: ICar[] = await JSON.parse(data);
//   return {
//     props: {
//       cars,
//     },
//   };
// };

export default adminPage;
