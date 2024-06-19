import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div id="error-page" className="p-4 flex flex-col justify-center items-center ">
            <h1 className="text-5xl lilita-one-regular leading-8 text-orange-500">Oops!</h1>
            <p className=" mt-10 lilita-one-regular leading-8">Sorry, an unexpected error has occurred.</p>
            <p className=" mt-10 lilita-one-regular leading-8 text-xl">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    </div>

    
  );
}