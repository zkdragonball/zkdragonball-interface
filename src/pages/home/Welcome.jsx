import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="flex w-full justify-end items-end h-[610px]">
            <div className="w-60 flex mr-20 mb-20 flex-col items-start justify-between p-20 py-12 px-4 relative"> 
                <button className="bg-slate-50 hover:bg-white font-bold py-2 px-4 rounded-3xl opacity-100 md:opacity-70 hover:opacity-100 
                transition duration-300 ease-in-out absolute bottom-0 right-0 mb-3 mr-4 w-58 h-20 text-2xl lilita-one-regular 
                leading-8 text-orange-500 flex items-center">
                    <span className="mr-6">
                        <i className="fas fa-map-marker-alt"></i> 
                    </span> 
                    <Link to="/fairMint">Get Started</Link>
                </button>
            </div>
        </div>

        
    );
}

export default Welcome;