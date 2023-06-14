"use client";

import { Progress, Button } from "flowbite-react";

function Configurator() {
  return (
    <>
      <div className="bg-gray-100 sm:grid grid-cols-5 grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
        <div className="h-96 col-span-4 bg-gradient-to-tr from-gray-400 to-gray-200 rounded-md flex ">
         
        </div>
        <div className="h-96 col-span-1 ">
          <div className="bg-white py-3 px-4 rounded-lg">
            <Progress
              labelProgress
              labelText
              progress={45}
              progressLabelPosition="inside"
              size="lg"
              textLabel="Обязательные комплектующие"
              textLabelPosition="outside"
            />
          </div>

          <div className="bg-white  rounded-md">
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <input
                type="text"
                placeholder="Введите название сборки"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
              />
            </div>

            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <textarea
                placeholder="Введите описание сборки (необязательно)"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
              />
            </div>
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <Button className="bg-gray">Сохранить</Button>
            </div>
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <Button>В корзину</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased">
        <div className="md:w-1/3 w-full">
          <img
            className="rounded-lg shadow-lg antialiased"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
        </div>
        <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
          <div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
            <div className="text-2xl text-white leading-tight">Admin User</div>
            <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
              <span className="border-b border-dashed border-gray-500 pb-1">
                Administrator
              </span>
            </div>
            <div className="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">
              Last Seen: <b>2 days ago</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Configurator;
