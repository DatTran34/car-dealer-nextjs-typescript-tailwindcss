import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { Button, Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
function adminPage() {
  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-4">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
            <div className="col-span-full md:col-span-6 space-y-4">
              <div>Product Name 1</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 space-y-4">
              <div>Product Name 2</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 space-y-4">
              <div>Product Name 3</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-3 md:col-span-2 space-y-4">
              <div>Product Name 4</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-3 md:col-span-6 space-y-4">
              <div>Product Name 5</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-full md:col-span-6 space-y-4">
              <div>Product Name 6</div>
              <div className="w-full">
                <Textarea label="Message" />
              </div>
            </div>
            <div className="col-span-full md:col-span-3 space-y-4">
              <div>Product Name7</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>
            <div className="col-span-full md:col-span-3 space-y-4">
              <div>Product Name 8</div>
              <div className="w-full">
                <Input label="Username" />
              </div>
            </div>

          </div>
          <div className="w-full flex flex-row justify-end space-x-4">
            <Button className="flex-1 md:flex-none" variant="gradient" color="blue">Apply</Button>
            <Button className="flex-1 md:flex-none" variant="outlined" color="blue">Cancel</Button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default adminPage;
