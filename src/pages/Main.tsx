import React, {useContext} from 'react'
import { Trending, Wellcome, Features } from '../components/wellcome';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-welcome">
        <Wellcome/>
        <div className='bg-black'>
          <Trending/>
        </div>
        <Features/>
      </div>
    </div>
  );
}

export default Main;