import React, {useContext} from 'react'
import { Trending, Welcome } from '../components';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-welcome">
        <Welcome/>
      </div>
      <div className='bg-black'>
        <Trending/>
      </div>
    </div>
  );
}

export default Main;