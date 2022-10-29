import { EncounterData } from '../components/Encounter';

const locationImage = process.env.PUBLIC_URL + '/images/locations/locations3.png';
const characterImage = process.env.PUBLIC_URL + '/images/characters/character_3.png';

export const bloomData: EncounterData = {
  order: 3,
  locationData: {
    pos: { x: '27px', y: '288px', z: '6' },
    img: locationImage
  },
  character: {
    name: 'Lily',
    img: characterImage
  },
  content: [
    {
      text: `a`,
      media: ''
    },
  ]
}