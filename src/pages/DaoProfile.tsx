import React, {useContext, useState, useEffect} from 'react';
// import { ConnectProfileModal } from '../modals';
import { ProfileContext } from '../context/ProfileContext'
import { Proposals, About, Members, DaoProfileSideBar } from '../components/daoProfile'
import {useLocation} from 'react-router-dom';
import Skeleton from "@material-ui/lab/Skeleton";
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
//@ts-ignore
type LocationProps = {
  state: {
    daoDetail: any;
  };
};

const DaoProfile = () => {
  const location = useLocation() as unknown as LocationProps;
  const daoDetail = location.state?.daoDetail;
  const [profileComponent, setProfileComponent] = useState<string>('Proposals');

  const handleComponent = (Component:string) => {
    console.log(Component);
    setProfileComponent(Component);
  }
  const profileImageObj = getParsedJsonObj(daoDetail.profileImage);
  const profileImageUrl = profileImageObj.url.concat(profileImageObj.hash);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
          <div className="bg-welcome flex min-h-[100vh] w-full justify-start items-start px-5 lg:px-40 md:px-20">
            <DaoProfileSideBar handleComponent={handleComponent} profileComponent={profileComponent}/>
            <div className="pt-28 text-white min-h-[100vh] w-5/6 flex-col justify-start items-start">
              <div className="mt flex justify-start items-start">
                { profileImageObj ? (
                  <div className="w-32">
                    <img 
                      className="object-cover overflow-hidden w-32 h-32 bg-[#1A1A1D] rounded-full"
                      src={profileImageUrl}
                      alt="altimg"
                    />
                  </div>
                ): (
                  <div className="w-32">
                    <Skeleton
                      animation="wave"
                      className=""
                      variant="circle"
                      height={'8rem'}
                    />  
                  </div>
                )}
                  <div className="flex-col px-2 py-0.5">
                      <p className="h-10 w-full text-4xl text-bold px-2 textShadow" >{daoDetail.daoName}</p>
                      <p className="h-20 px-2 pt-2">{daoDetail.description}</p>
                  </div>
              </div>
              <>
                { (profileComponent === "Proposals") && (<Proposals daoDetail={daoDetail}/>)}
                { (profileComponent === "About") && (<About daoDetail={daoDetail}/>)}
                { (profileComponent === "Members") && (<Members daoDetail={daoDetail}/>)}
              </>
            </div>
          </div>
        {/* )} */}
    </div>
  );
}

export default DaoProfile;