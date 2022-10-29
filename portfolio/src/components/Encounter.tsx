import React, { useState } from 'react';
import '../style/Encounter.css';
import '../style/App.css';
import Character from './Character';
import Location from './Location';
import { motion, AnimatePresence } from 'framer-motion';

export type EncounterData = {
  order: number,
  locationData: {
    pos: { x: string, y: string, z: string },
    img: string
  },
  character: {
    name: string,
    img: string
  },
  content: {
    text: string,
    media: string
  }[]
}

type EncounterProps = {
  data: EncounterData,
  movePlayer: (newLoc: number) => Promise<void>,
  isActive?: boolean
}

export function Encounter(props: EncounterProps): React.ReactElement {
  let [ isActive, setIsActive ] = useState(props.isActive ?? false);

  const beginEncounter = async () => {
    props.movePlayer(props.data.order)
         .then(() => {
          document.body.style.overflowY = 'hidden';
          setIsActive(true);
        });
  };

  const endEncounter = () => {
    setIsActive(false);
    document.body.style.overflowY = 'scroll';
  };

  return (
    <>
      <Location
        pos={props.data.locationData.pos}
        img={props.data.locationData.img}
        beginEncounter={beginEncounter}
      />
      <AnimatePresence>
        {isActive && (
          <>
            <motion.div 
              className='background-darkener'
              initial={{opacity: 0}}
              animate={{opacity: 1, transition: {delay: 0}}}
              exit={{opacity: 0}}
            ></motion.div>
            <Character
              name={props.data.character.name}
              img={props.data.character.img}
              endEncounter={endEncounter}
              content={props.data.content}
            />
            <motion.img
              src={process.env.PUBLIC_URL + '/images/ui/exit_button.png'}
              alt='Exit dialogue'
              className='ui-button exit-button'
              onClick={endEncounter}
              initial={{x: -20, opacity: 0, scale: 2.5}}
              animate={{x: 0, opacity: 1, transition: {delay: 0}}}
              whileHover={{scale: 3}}
              whileTap={{scale: 2.5}}
              exit={{opacity: 0}}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// export default Encounter;
