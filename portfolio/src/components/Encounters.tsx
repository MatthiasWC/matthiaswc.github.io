import React, { useEffect, useRef, useState } from 'react';
import { Encounter, EncounterData } from './Encounter';
import { motion, useAnimation } from 'framer-motion';
import '../style/Encounters.css';

// Handle progression/location unlocking w/ cookies

type EncountersData = {
  encounters: EncounterData[]
}

const path = [
  { loc: 0, x: -10, y: 145, z: 1 },
  { loc: null, x: 242.5, y: 145, z: 1 },
  { loc: null, x: 242.5, y: 385, z: 3 },
  { loc: 1, x: 120, y: 385, z: 3 },
  { loc: null, x: -257.5, y: 385, z: 3 },
  { loc: null, x: -257.5, y: 625, z: 5 },
  { loc: 2, x: -120, y: 625, z: 5 },
  { loc: null, x: 242.5, y: 625, z: 5 },
  { loc: null, x: 242.5, y: 865, z: 7 },
  { loc: 3, x: 120, y: 865, z: 7 },
  { loc: null, x: -257.5, y: 865, z: 7 },
  { loc: null, x: -257.5, y: 1105, z: 9 },
  { loc: 4, x: -120, y: 1105, z: 9 },
];

const playerAnimTime = new Map<string, number>([
  ['idle', 400],
  ['run_left', 90],
  ['run_right', 90],
  ['run_up', 90],
  ['run_down', 90],
]);

const playerAnimSrc = (name: string, frame: number): string => {
  return process.env.PUBLIC_URL + '/images/player/player_' + name + '_' + frame + '.png';
};

function Encounters(props: EncountersData): React.ReactElement {
  const controls = useAnimation();
  // let [ loc, setLoc ] = useState(0);
  let loc = useRef(0);
  let pathIndex = useRef(0);
  let [ currPlayerAnim, setCurrPlayerAnim ] = useState({name: 'idle', frame: 0});
  let isAnimatingPlayer = useRef(false);
  let playerAnim = useRef('idle');
  let playerFrame = useRef(0);
  let playerAnimTimeout = useRef(setTimeout(() => {}, 0));
  let numMoves = useRef(0);

  useEffect(() => {
    // console.log('useEffect');
    if (!isAnimatingPlayer.current) {
      // console.log('animate player');
      animatePlayer();
      isAnimatingPlayer.current = true;
    }
  }, []);

  const animatePlayer = () => {
    // console.log((currPlayerAnim.frame));
    clearTimeout(playerAnimTimeout.current);
    playerFrame.current = (playerFrame.current + 1) % 2;
    let newPlayerAnim = {
      name: playerAnim.current,
      frame: playerFrame.current
    };
    setCurrPlayerAnim(newPlayerAnim);
    playerAnimTimeout.current = setTimeout(animatePlayer, playerAnimTime.get(playerAnim.current));
  };

  const movePlayer = async (newLoc: number) => {
    let animation = Promise.resolve();
    let thisNumMoves = numMoves.current++;
    if (path[pathIndex.current].loc !== newLoc) {
      let i = pathIndex.current;
      let prevIndex = i;
      const b = 7;
      do {
        i += newLoc > loc.current ? 1 : -1;
        if (path[i].loc === null || path[i].loc === newLoc) {
          let [ x, y, z, prevX, prevY ] = [ path[i].x, path[i].y, path[i].z, 
                                            path[prevIndex].x, path[prevIndex].y ];
          let dist = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);
          let duration = (Math.log(dist + b) / Math.log(b) - 1) * 0.27;
          // Determine player animation to play
          let dir = {x: x - prevX, y: y - prevY};
          animation = animation.then(() => {
            if (numMoves.current > 1 && thisNumMoves === 0) {
              numMoves.current--;
              return Promise.resolve();
            }
            if (Math.abs(dir.x) > Math.abs(dir.y))
              playerAnim.current = 'run_' + (dir.x > 0 ? 'right' : 'left');
            else
              playerAnim.current = 'run_' + (dir.y > 0 ? 'down' : 'up');
            animatePlayer();
            return controls.start({
              x, y, zIndex: z, transition: { bounce: 0, duration }
            });
          });
          prevIndex = i;
        }
        animation = animation.then(() => {
          pathIndex.current += newLoc > loc.current ? 1 : -1;
          loc.current = path[pathIndex.current].loc ?? loc.current;
          console.log("pathIndex: " + pathIndex.current);
          console.log("loc: " + loc.current);
          return Promise.resolve();
        });
      } while (path[i].loc !== newLoc)
    }
    animation.then(() => {
      playerAnim.current = 'idle';
      animatePlayer();
      numMoves.current--;
      return Promise.resolve();
    });
    return animation;
  };

  return (
    <>
      <div className='center'>
        <motion.img
          src={playerAnimSrc(currPlayerAnim.name, currPlayerAnim.frame)}
          alt='Player'
          className='player'
          initial={{
            x: path[pathIndex.current].x, 
            y: path[pathIndex.current].y, 
            zIndex: path[pathIndex.current].z, 
            scale: 2.5
          }}
          animate={controls}
        />
      </div>
      {props.encounters.map(
        (encounter) => 
          <Encounter
            key={encounter.locationData.img + encounter.order.toString()}
            data={encounter}
            movePlayer={movePlayer}
            isActive={encounter.order === 0}
          />
      )}
    </>
  );
}

export default Encounters;