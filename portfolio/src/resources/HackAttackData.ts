import { EncounterData } from '../components/Encounter';

const locationImage = process.env.PUBLIC_URL + '/images/locations/locations1.png';
const characterImage = process.env.PUBLIC_URL + '/images/characters/character_1.png';

export const hackAttackData: EncounterData = {
  order: 1,
  locationData: {
    pos: { x: '30px', y: '95px', z: '2' },
    img: locationImage
  },
  character: {
    name: 'Codee',
    img: characterImage
  },
  content: [
    {
      text: `if ( Date().today() > new Date('Dec 31 1999') ) <br/>
      {<br/>
      \u2001self.destruct();<br/>
      }<br/>
      else ...<br/>
      !!!`,
      media: ''
    },
    {
      text: `You surprised me! I am Codee Computer, hero of <em>Hack 
      Attack: Code Corruption</em>. In this action/puzzle platformer, you
      have the unique ability to re-write my code and hack into killer
      office appliances in real time!`,
      media: process.env.PUBLIC_URL + '/images/media/hack_attack_thumbnail.gif'
    },
    {
      text: `<em>Hack Attack: Code Corruption</em> was created by a team of
      5 students in about 6 weeks for a game development course at the 
      University of Michigan. Matthias pitched and led the game's design,
      architected and implemented all of the game's major systems, and 
      custom-made all but a couple of the game's art assets.`,
      media: process.env.PUBLIC_URL + '/images/media/hack_attack_trailer.mp4'
    },
    {
      text: `Check out <em>Hack Attack</em>&thinsp;'s <a 
      href='https://mwclaass.itch.io/hack-attack'>itch.io
      page</a> to play the game for yourself!`,
      media: process.env.PUBLIC_URL + '/images/media/hack_attack_thumbnail.gif'
    },
  ]
}