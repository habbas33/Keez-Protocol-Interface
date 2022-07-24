import React, {useContext} from 'react';
import { ConnectProfileModal } from '../modals/';
import { ProfileContext } from '../context/ProfileContext'

const Propose: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  return (
    <div className="min-h-screen">
      { !accountAddress ? (
        <div className="bg-welcome flex h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <div className="bg-welcome flex h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
            <h1 className="text-white">Propose page</h1>
          </div>
        )}
    </div>
  );
}

export default Propose;