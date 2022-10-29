import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playRandomPop } from '../scripts/AudioUtils';
import '../style/Character.css';

type CharacterData = {
  name: string,
  img: string,
  endEncounter: () => void,
  content: { text: string, media: string }[]
}

const noMediaImage = process.env.PUBLIC_URL + '/images/media/no_media.png'

function Character(props: CharacterData): React.ReactElement {
  // const nextControls = useAnimation();
  // const backControls = useAnimation();
  let [ currContent, setCurrContent ] = useState(0);
  let [ dir, setDir ] = useState(1);
  let [ currText, setCurrText ] = useState(props.content[currContent].text[0]);
  let [ wholeCurrText, setWholeCurrText ] = useState(props.content[currContent].text);
  let [ currMedia, setCurrMedia ] = useState(props.content[currContent].media);
  let dialogueBorder = 'url(\'' + process.env.PUBLIC_URL + '/images/ui/dialogue_frame.png\')' +
                       '21 fill / calc(21px * var(--pixel-scale)) / 0 stretch';
  let mediaBorder = 'url(\'' + process.env.PUBLIC_URL + '/images/ui/media_frame.png\')' +
                    '13 fill / calc(13px * var(--pixel-scale)) / 0 stretch';
  let characterBorder = 'url(\'' + process.env.PUBLIC_URL + '/images/ui/small_frame.png\')' +
                    '5 fill / 5px / 0 stretch';
  let nameBorder = 'url(\'' + process.env.PUBLIC_URL + '/images/ui/small_frame.png\')' +
                    '5 fill / calc(5px * var(--pixel-scale)) / 0 stretch';

  const lettersPerPop = 3;
  let popTimer = useRef(0);
  let textTimeout = useRef(setTimeout(() => {}, 0));

  // const changeSize = (controls: AnimationControls, newSize: number) => {
  //   controls.start({ scale: newSize });
  // };

  useEffect(() => {
    clearTimeout(textTimeout.current);
    if (currText.length !== wholeCurrText.length) {
      textTimeout.current = setTimeout(() => {
        let newText: string = '';
        if (wholeCurrText[currText.length] === '<') {
          let endIndex = wholeCurrText.indexOf('>', currText.length) + 1;
          if (endIndex === 0) endIndex = currText.length + 1;
          newText = wholeCurrText.substring(0, endIndex);
        }
        else if (wholeCurrText[currText.length] === '&') {
          let endIndex = wholeCurrText.indexOf(';', currText.length) + 1;
          if (endIndex === 0) endIndex = currText.length + 1;
          newText = wholeCurrText.substring(0, endIndex);
        }
        else {
          newText = currText + wholeCurrText[currText.length];
        }
        setCurrText(newText);
        if (popTimer.current >= lettersPerPop) {
          playRandomPop();
          popTimer.current = 0;
        }
        else {
          popTimer.current++;
        }
      }, 15);
    }
  }, [currText, wholeCurrText]);

  const changeContent = (i: number): void => {
    setDir(i);
    let newCurrContent = currContent + i;
    if (newCurrContent >= 0) {
      if (newCurrContent < props.content.length) {
        // if (props.content[newCurrContent].media !== '' &&
        //     props.content[currContent].media !==
        //     props.content[newCurrContent].media)
          setCurrMedia(props.content[newCurrContent].media);
        setCurrText('');
        // setCurrText(props.content[newCurrContent].text);
        setWholeCurrText(props.content[newCurrContent].text);
        setCurrContent(newCurrContent);
      }
      else {
        props.endEncounter();
      }
    }
  };

  const advanceDialogue = () => {
    changeContent(1);
  };

  const retreatDialogue = () => {
    changeContent(-1);
  };

  const getExt = (file: string): string | undefined => {
    return file.split('.').pop()?.toLowerCase();
  };

  const isVideo = (file: string): boolean => {
    let ext = getExt(file);
    return ext === 'mp4' || ext === 'webm' || ext === 'mkv' || 
           ext === 'mov' || ext === 'avi' || ext === 'wmv';
  };

  const mediaVariants = {
    enter: (dir: number) => {
      return {
        x: dir > 0 ? '100vw' : '-100vw',
        opacity: 0,
        translateX: '-50%',
        translateY: '50%'
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => {
      return {
        x: dir > 0 ? '-100vw' : '100vw',
        opacity: 0
      };
    }
  };

  return (
    <>
      <motion.div
        className='speech-bubble'
        style={{
          borderStyle: 'solid',
          borderWidth: 'calc(21px * var(--pixel-scale))',
          imageRendering: 'pixelated',
          borderImage: dialogueBorder,
          MozBorderImage: dialogueBorder
        }}
        initial={{x: -50, y: -10, rotate: -10, opacity: 0}}
        animate={{x: 0, y: 0, rotate: 0, opacity: 1}}
        exit={{x: -50, y: -10, rotate: -10, opacity: 0}}
      >
          <motion.img
            key={'character' + currContent.toString()}
            src={props.img}
            alt={props.name}
            className='character'
            style={{
              borderStyle: 'solid',
              borderWidth: '8px 8px 5px 8px',
              imageRendering: 'pixelated',
              borderImage: characterBorder,
              MozBorderImage: characterBorder
            }}
            initial={{ scale: 3.7 }}
            animate={{ scale: 2.5 }}
            exit={{ x: -20, scale: 0 }}
          />
        <motion.div
          key={'name' + currContent.toString()}
          className='character-name-container'
          style={{
            borderStyle: 'solid',
            borderWidth: 'calc(5px * var(--pixel-scale))',
            imageRendering: 'pixelated',
            borderImage: nameBorder,
            MozBorderImage: nameBorder
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          exit={{ x: -20, scale: 0 }}
        >
          <p
            className='character-name'
            dangerouslySetInnerHTML={{ __html: props.name }}
          ></p>
        </motion.div>
        <p 
          className='speech'
          dangerouslySetInnerHTML={{ __html: currText }}
        ></p>
      </motion.div>
      { currMedia === '' ? <></> : isVideo(currMedia) ? (
        <motion.video 
          key={'media' + currContent.toString()}
          className='content-media'
          controls 
          style={{
            borderStyle: 'solid',
            borderWidth: 'calc(13px * var(--pixel-scale))',
            imageRendering: 'pixelated',
            borderImage: mediaBorder,
            MozBorderImage: mediaBorder
          }}
          custom={dir}
          variants={mediaVariants}
          initial={'enter'}
          animate={'center'}
          exit={'exit'}
        >
            <source 
              src={currMedia} 
              type={'video/' + getExt(currMedia)}
            />
            Your browser does not support embedded videos.
        </motion.video>
      ) : (
        <motion.img
          key={'media' + currContent.toString()}
          src={currMedia === '' ? noMediaImage : currMedia}
          alt=''
          className={currMedia === '' ? 'no-media-image' : 'content-media'}
          style={{
            borderStyle: 'solid',
            borderWidth: 'calc(13px * var(--pixel-scale))',
            imageRendering: 'pixelated',
            borderImage: mediaBorder,
            MozBorderImage: mediaBorder,
            originX: 0.5,
            originY: 0.5
          }}
          // initial={{x: 50, y: -10, rotate: 10, opacity: 0, translateX: '-50%', translateY: '50%'}}
          // animate={{x: 0, y: 0, rotate: 0, opacity: 1, transition: {delay: props.transitionDelay}}}
          // exit={{x: 50, y: -10, rotate: 10, opacity: 0}}
          custom={dir}
          variants={mediaVariants}
          initial={'enter'}
          animate={'center'}
          exit={'exit'}
        />
      )}
      <motion.div
        className='ui-button next-background'
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={advanceDialogue}
      >
      </motion.div>
      <motion.img
        src={process.env.PUBLIC_URL + '/images/ui/next_button.png'}
        alt='Advance dialogue'
        className='next-button'
        initial={{x: 50, opacity: 0, scale: 2.5}}
        animate={{x: 0, opacity: 1}}
        exit={{x: 50, opacity: 0}}
      />
      <motion.div
        className='ui-button back-background'
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={retreatDialogue}
      >
      </motion.div>
      <motion.img
        src={process.env.PUBLIC_URL + '/images/ui/back_button.png'}
        alt='Go back to previous dialogue'
        className='back-button'
        initial={{x: -50, opacity: 0, scale: 2.5}}
        animate={{x: 0, opacity: 1}}
        exit={{x: -50, opacity: 0}}
      />
    </>
  );
}

export default Character;
