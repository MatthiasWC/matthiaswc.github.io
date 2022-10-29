import React from 'react';
import { motion, AnimationControls } from 'framer-motion';
import '../style/Player.css';

type PlayerData = {
  pos:  { x: number, y: number, z: number },
  controls: AnimationControls
}

function Player(props: PlayerData): React.ReactElement {
  return (
    <div className='center'>
      <motion.img
        src={process.env.PUBLIC_URL + '/images/characters/codee.png'}
        alt='Player'
        className='player'
        initial={{x: props.pos.x, y: props.pos.y, zIndex: props.pos.z, scale: 2.5}}
        animate={props.controls}
      />
    </div>
  );
}

export default Player;
