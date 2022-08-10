const ProfileCard = () => {
  return (
    <div
      className="bg-[#4b3132] h-80 my-5 w-full md:w-[45%]
        flex-col p-3 rounded-md hover:shadow-2xl"
    ></div>
  );
};

const Trending = () => {
  const userProfiles = [0, 1, 2, 3, 5];
  return (
    <div className="w-full justify-start items-center px-10 py-10 lg:px-20 md:px-20 ">
      <div className=" flex-initial justify-between py-5 w-[90%] mx-auto">
        <h1 className="text-2xl md:text-3xl text-left text-white font-extrabold">
          TRENDING PROPOSALS
        </h1>
        <div className="flex gap-3 flex-wrap justify-between items-center">
          {[...userProfiles].reverse().map((profile, i) => (
            <ProfileCard key={i} />
          ))}
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Trending;
