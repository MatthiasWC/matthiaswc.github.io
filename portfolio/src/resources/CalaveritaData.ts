import { EncounterData } from '../components/Encounter';

const locationImage = process.env.PUBLIC_URL + '/images/locations/locations2.png';
const characterImage = process.env.PUBLIC_URL + '/images/characters/character_2.png';

export const calaveritaData: EncounterData = {
  order: 2,
  locationData: {
    pos: { x: '-65px', y: '190px', z: '4' },
    img: locationImage
  },
  character: {
    name: 'Calaverita',
    img: characterImage
  },
  content: [
    {
      text: `Boo!`,
      media: ''
    },
    {
      text: `Just kidding! I may be a skeleton, but I'm not the spooky sort. 
      Actually, I could use your help! Build paths to the exit by moving 
      colorful <em>papel picado</em>, but be careful to keep me out of the 
      way! Help me escape the afterlife in <em>Calaverita</em>, a clever and 
      highly stylized puzzle platformer.`,
      media: ''
    },
    {
      text: `Matthias developed <em>Calaverita</em> on his own in 2 weeks
      for a video game design course at the University of Michigan. The game
      concept, design, art, and programming are all original, and were all 
      created within the two week time span.`,
      media: ''
    },
    {
      text: `You can play <em>Calaverita</em> in your browser 
      <a href=''>here</a> or download it for yourself <a href=''>here</a>.
      I recommend downloading it, but if you'd rather play in-browser, make 
      sure that hardware `,
      media: ''
    },
  ]
}