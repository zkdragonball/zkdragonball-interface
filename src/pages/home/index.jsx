import Navbar from '../../components/Navbar';
import Welcome from './Welcome';
import Nft from './Nft';
import About from './About';
import Tokenomics from './Tokenomics';
import Partner from './Partner';
import Footer from './Footer';
import  bgImg  from '../../assets/bg.png';



const Home = () => {
    return (
        <>
            <div>
                <div className=' h-full bg-gradient-to-b  from-blue-300 to-green-200'>
                    <div className="bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${bgImg})`,
                    height: '710px', width: '100%' }}>
                    <Navbar />
                    <Welcome />
                    </div>
                    <div style={{ height: '800px', width: '100%' }}>
                    <About/>
                    </div>
                    <div className='h-[650px] md:h-[400px]'>
                    <Tokenomics/>
                    </div>
                    <div className='h-[650px] md:h-[450px]'>
                    <Nft/>
                    </div>
                    <div className='mt-6'>
                    <Partner/>
                    <Footer/>
                    </div>
                    
                </div>
            </div> 
        </>
    );
}

export default Home;