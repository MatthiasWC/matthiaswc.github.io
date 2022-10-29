import React from 'react';
import './style/App.css';
import Encounters from './components/Encounters';

// Encounter data
import { testData } from './resources/TestData';
import { homeData } from './resources/HomeData';
import { hackAttackData } from './resources/HackAttackData';
import { calaveritaData } from './resources/CalaveritaData';
import { bloomData } from './resources/BloomData';
import { caduceusData } from './resources/CaduceusData';

function App(): React.ReactElement {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/images/portfolio_map.png'}
        alt='Background'
        className='background'
      />
      <Encounters encounters={[
        // testData,
        homeData, hackAttackData, calaveritaData, bloomData,
        caduceusData
      ]} />
    </div>
  );
}

export default App;
