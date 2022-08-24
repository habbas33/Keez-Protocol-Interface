import React, {useContext, useState, useEffect} from 'react';
import { ConnectProfileModal } from '../modals';
import { ProfileContext } from '../context/ProfileContext'
import { UserActivity, ProfileDetails, ProfileSideBar, Paops } from '../components/profile'

const UserProfile: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  const [profileComponent, setProfileComponent] = useState<string>('ProfileDetails');

  const handleComponent = (Component:string) => {
    console.log(Component);
    setProfileComponent(Component);
    // createDaoService(accountAddress);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      { !accountAddress ? (
        <div className="bg-other flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <div className="bg-other flex min-h-[100vh] w-full justify-start items-start px-5 lg:px-40 md:px-20">
            <ProfileSideBar handleComponent={handleComponent} profileComponent={profileComponent}/>
            <>
              { (profileComponent === "ProfileDetails") && (<ProfileDetails accountAddress={accountAddress}/>)}
              { (profileComponent === "UserActivity") && (<UserActivity handleComponent={handleComponent}/>)}
              { (profileComponent === "POAPs") && (<Paops handleComponent={handleComponent}/>)}
          </>
          </div>
        )}
    </div>
  );
}

export default UserProfile;