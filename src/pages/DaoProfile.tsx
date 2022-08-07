import React, {useContext, useState, useEffect} from 'react';
import { ConnectProfileModal } from '../modals';
import { ProfileContext } from '../context/ProfileContext'
import { Proposals, About, Members, DaoProfileSideBar } from '../components/daoProfile'

const DaoProfile: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  const [profileComponent, setProfileComponent] = useState<string>('Proposals');

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
        <div className="bg-welcome flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <div className="bg-welcome flex min-h-[100vh] w-full justify-start items-start px-5 lg:px-40 md:px-20">
            <DaoProfileSideBar handleComponent={handleComponent} profileComponent={profileComponent}/>
            <>
              { (profileComponent === "Proposals") && (<Proposals accountAddress={accountAddress}/>)}
              { (profileComponent === "About") && (<About handleComponent={handleComponent}/>)}
              { (profileComponent === "Members") && (<Members handleComponent={handleComponent}/>)}
          </>
          </div>
        )}
    </div>
  );
}

export default DaoProfile;