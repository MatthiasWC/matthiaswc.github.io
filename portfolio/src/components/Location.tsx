import React from 'react';
import { motion } from 'framer-motion';
import '../style/Location.css';

type LocationData = {
  pos: {
    x: string,
    y: string,
    z: string
  },
  img: string,
  beginEncounter: () => void
}

function Location(props: LocationData): React.ReactElement {
  const style = {
    left: 'calc(50vw + (' + props.pos.x + ' * var(--pixel-scale)))',
    top: 'calc(' + props.pos.y + ' * var(--pixel-scale))',
    zIndex: props.pos.z
  };

  return (
    <motion.img
      src={props.img}
      alt={'Click to travel to this location'}
      onClick={props.beginEncounter}
      style={style}
      className='outline-select'
      initial={{ scale: 2.5 }}
      whileHover={{ scale: 2.6 }}
      whileTap={{ scale: 2.5 }}
    />
  );
}

export default Location;