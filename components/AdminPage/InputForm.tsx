import { Breadcrumbs, Button, Input } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { ICar } from "../Types/model";

function InputForm({
  car,
  handleOnChangeCar,
  submit,
  title
}: {
  car: ICar;
  handleOnChangeCar: (arg0: string, arg1: string) => void;
  submit: () => Promise<void>;
  title: string
}) {
  return (
    <div>
      <div>
        <div className="px-4 py-2">{title}</div>
        <Breadcrumbs>
          <a href="#" className="opacity-60">
            Docs
          </a>
          <a href="#" className="opacity-60">
            Components
          </a>
          <a href="#">Breadcrumbs</a>
        </Breadcrumbs>
      </div>
      <div className="bg-white rounded-lg p-4 space-y-6">
        <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
          {Object.keys(car).sort().map((key, index) => {
            return (
              <div key={index} className="col-span-3 md:col-span-2 space-y-4">
                <div className="w-full">
                  <Input
                    label={key.replace(/_/g, " ").toUpperCase()}
                    defaultValue={car[key]}
                    onChange={(e) => {
                      handleOnChangeCar(key, e.target.value);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-row justify-end space-x-4">
          <Button
            className="flex-1 md:flex-none"
            variant="gradient"
            color="blue"
            onClick={() => {
              submit();
            }}
          >
            Apply
          </Button>
          <Link
            href={{
              pathname: "/adminPage",
            }}
          >
            <Button
              className="flex-1 md:flex-none"
              variant="outlined"
              color="blue"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
