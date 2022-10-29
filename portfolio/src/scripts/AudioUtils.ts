const pops = [
  process.env.PUBLIC_URL + '/audio/pop1.mp3',
  process.env.PUBLIC_URL + '/audio/pop2.mp3',
  process.env.PUBLIC_URL + '/audio/pop3.mp3',
  process.env.PUBLIC_URL + '/audio/pop4.mp3',
  process.env.PUBLIC_URL + '/audio/pop5.mp3',
  process.env.PUBLIC_URL + '/audio/pop6.mp3',
  process.env.PUBLIC_URL + '/audio/pop7.mp3',
];
const popVolumes = [
  0.12,
  0.1,
  0.1,
  0.1,
  0.12,
  0.13,
  0.12
]

export function playSound(filepath: string, volume: number = 0.1) {
  let audio = new Audio(filepath);
  audio.volume = volume;
  audio.play();
}

export function playRandomSound(filepaths: string[], volumes?: number[]) {
  let i = Math.floor(Math.random() * filepaths.length);
  playSound(filepaths[i], volumes ? volumes[i % volumes.length] : 0.1);
}

export function playRandomPop() {
  playRandomSound(pops, popVolumes);
}