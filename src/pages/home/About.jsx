import  bg2  from '../../assets/bg/bg2.png'

const About = () => {
    return (
        <>
           <div className="w-full h-screen">
                <div className="lg:px-40 md:mb-20 flex flex-col items-center">
                    <div className="mx-auto flex items-center mt-20">
                        <h1 className="text-center text-4xl lilita-one-regular leading-8 text-orange-500">ABOUT</h1>
                    </div>
                    <div className="mt-5 ">
                        <img src={bg2} alt="bg" className="h-[180px] md:h-[270px] border-2 border-white rounded-lg shadow-md" />
                    </div>
                    <div className='w-4/5 mt-5 flex flex-col items-center justify-center'>
                        <div className="mt-5 w-full flex max-w-lg flex-col gap-y-2 px-5 md:px-0">
                            <dt className="text-xl lilita-one-regular leading-8 text-gray-700 text-center md:text-left">
                                At ZkDragonBall, we invite you to rediscover the timeless virtues of courage, optimism, and strength that resonate throughout the Dragon Ball universe. 
                            </dt>
                            <dt className='text-xl lilita-one-regular leading-8 text-gray-700 mt-5 text-center md:text-left'>
                            Through AI-generated imagery and blockchain technology, we celebrate Toriyama's iconic legacy, offering a unique blend of nostalgia and modern innovation. 
                            </dt>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;