import { EncounterData } from '../components/Encounter';

const locationImage = process.env.PUBLIC_URL + '/images/locations/locations0.png';
const characterImage = process.env.PUBLIC_URL + '/images/characters/character_0.png';

export const homeData: EncounterData = {
  order: 0,
  locationData: {
    pos: { x: '-20px', y: '20px', z: '0' },
    img: locationImage
  },
  character: {
    name: 'Matthias',
    img: characterImage
  },
  content: [
    {
      text: `Oh, hi there! Welcome to my interactive game development 
      portfolio!`,
      media: ''
    },
    {
      text: `I'm a senior studying Computer Science at the University of 
      Michigan. I have a passion for game development, but I also have 
      experience across the full stack of web development.`,
      media: ''
    },
    {
      text: `Each location on the map represents a major project that 
      I've worked on. Have fun exploring!`,
      media: ''
    },
  ]
}