import { EncounterData } from '../components/Encounter';

const codeeImage = process.env.PUBLIC_URL + '/images/characters/codee.png';
const tallImage = process.env.PUBLIC_URL + '/images/cakester.png';
const wideImage = process.env.PUBLIC_URL + '/images/glow_effect.gif';
const video = 'https://www.w3schools.com/html/mov_bbb.mp4';

export const testData: EncounterData = {
  order: 0,
  locationData: {
    pos: { x: '-50px', y: '100px', z: '100' },
    img: codeeImage
  },
  character: {
    name: 'Codee',
    img: codeeImage
  },
  content: [
    {
      text: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      media: wideImage
    },
    {
      text: 'Sample content 2',
      media: tallImage
    },
    {
      text: 'Sample content 3',
      media: video
    }
  ]
}