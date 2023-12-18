import Head from "next/head";
import Link from "next/link";
import React from "react";

const renderData = (
  <div>
    <Head>
      <title>error</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Arvo"
      />
    </Head>
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-[80%] items-center space-y-4">
        <div className="flex-col space-y-6 text-center md:w-1/2 w-[80%]">
          <div>
            <h1 className=" text-6xl text-red-600 font-extrabold ">
              Fuel Station
            </h1>
          </div>
          <div className="text-5xl font-medium">Page not found</div>
          <div className="text-gray-500">
            Sorry, the page you're looking for isn't available.
          </div>

          <Link href="/">
            <button className="mt-10 rounded-lg text-gray-600">Visit Homepage</button>
          </Link>
        </div>
        <div className="md:w-full w-full md:h-full h-full   rounded-xl overflow-hidden">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt=""
            className=""
          />
        </div>
      </div>
    </div>
  </div>
);
export default function Error() {
  return <>{renderData}</>;
}
Error.getLayout = function PageLayout(page) {
  return <>{page}</>;
};