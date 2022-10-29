import { EncounterData } from '../components/Encounter';

const locationImage = process.env.PUBLIC_URL + '/images/locations/locations4.png';
const characterImage = process.env.PUBLIC_URL + '/images/characters/character_4.png';

export const caduceusData: EncounterData = {
  order: 4,
  locationData: {
    pos: { x: '-68px', y: '382px', z: '8' },
    img: locationImage
  },
  character: {
    name: 'Hermes',
    img: characterImage
  },
  content: [
    {
      text: `a`,
      media: ''
    },
  ]
}