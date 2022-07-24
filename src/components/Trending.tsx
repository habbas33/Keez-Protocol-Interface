const ProfileCard = ( ) => {

    return (
      <div className="bg-[#4b3132] h-80 my-10 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
      >
      </div>
    );
  };
  
const Trending = () => {
    const userProfiles = [0,1,2,3,5]
  return (
    <div className="flex w-full justify-start items-center px-5 py-10 lg:px-20 md:px-20 ">
        <div className="flex-column flex-initial justify-between py-5 px-20">
            <h1 className="text-3xl text-left text-white font-extrabold">
                TRENDING PROPOSALS
            </h1>
            <div className="flex flex-wrap justify-between items-center">
                {[...userProfiles].reverse().map((profile, i) => (
                        <ProfileCard key={i} />
                    ))}
                <ProfileCard/>
            </div>
        </div>
      </div>
  );
};

export default Trending;
