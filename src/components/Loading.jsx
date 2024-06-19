import Navbar from "./Navbar";
export default function Loading() {

  return (

    <div className='h-full bg-gradient-to-b  from-blue-300 to-green-200'>
      <div className="flex flex-col items-center h-screen">
        <Navbar/>
        <div className="p-4 flex flex-col justify-center items-center ">
            <h1 className="text-3xl lilita-one-regular leading-8 text-orange-500">Loading ...</h1>
            
        </div>
      </div>
    </div>

    
  );
}