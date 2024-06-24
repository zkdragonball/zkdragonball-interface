import Navbar from "../../components/Navbar";

export default function treasury() {

  return (
    <div className='h-full bg-gradient-to-b  from-blue-300 to-green-200'>
        <div className="flex flex-col items-center h-screen">
          <Navbar/>
          <div id="error-page" className="p-4 flex flex-col justify-center items-center ">
              <h1 className="text-5xl lilita-one-regular leading-8 text-orange-500">treasury</h1>
          </div>
        </div>
    </div>
  );
}
