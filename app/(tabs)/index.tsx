/* --- LIBRARY IMPORT --- */

import { Animated, Easing, SafeAreaView, ImageBackground, Text} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { GlobalStyles } from '@/components/Styles';


export let pkdex = (Math.floor(Math.random() * 1024)) + 1 ;

/* --- APP EXPORT --- */
export default function HomePage() {
  /* --- STATE DECLARATION --- */
  const [pkmn, setPkmn] = useState(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [pkmnImg, setPkmnImg] = useState<string | undefined>(undefined);
  const [pkmnName, setPkmnName] = useState(null);
  const [pkmnCry, setpkmnCry] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reloadState, setreloadState] = useState(true);
  const [hideState, sethideState] = useState(GlobalStyles.unhidden);
  const [revealState, setrevealState] = useState(GlobalStyles.hidden);

  /* --- DATA FETCHING --- */

  const randomEncoutner = () => {
    

    fetch('https://pokeapi.co/api/v2/pokemon/'+pkdex)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setPkmn(data);
      setPkmnImg(data.sprites.front_default ?? undefined);
      setPkmnName(data.name);
      setpkmnCry(data.cries?.latest ?? null);
    })
    .catch((error) => console.warn('Could not load Pokémon data:', error));
  }

  /* --- VARIABLE DECLARATION --- */

  let cycle = (Math.floor(Math.random() * 3)) + 1;
  let cycleStyle;

  /* --- ANIMATION CYCLES --- */

  // CYCLE 1 //
  const jumpCycle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(jumpCycle, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear
          }),
          Animated.timing(jumpCycle, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.linear
          })
        ])
    ).start();
  }, [jumpCycle]);

  const jump = jumpCycle.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, -15],
    // outputRange: ["-10%", "-15%"],
  });
  let cycle1 = {transform: [{translateY: jump}]};

  // CYCLE 2 //
  const shakeCycle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeCycle, {
            toValue: 1,
            delay: 500,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear
          }),
          Animated.timing(shakeCycle, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.linear
          })
        ])
    ).start();
  }, [shakeCycle]);

  const shakeSide = shakeCycle.interpolate({
    inputRange: [0, 1],
    outputRange: [6, -2],
    // outputRange: ['6%', '-2%'],
  });

  const shakeUp = shakeCycle.interpolate({
    inputRange: [0,1],
    outputRange: [-8, -3],
    // outputRange: ['-8%', '-3%'],
  });

  let cycle2 = {transform: [{translateX: shakeSide},{translateY: shakeUp}]};
  
  // CYCLE 3 //
  const rotateCycle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateCycle, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear
          }),
          Animated.timing(rotateCycle, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.linear
          })
        ])
    ).start();
  }, [rotateCycle]);

  const rotate = rotateCycle.interpolate({
    inputRange: [0, 1],
    outputRange: ['5deg', '-5deg'],
  });
  let cycle3 = {transform: [{rotate: rotate}],transformOrigin: 'bottom center'};

    //assigns random animation cycles
    if(cycle==1){
      cycleStyle = cycle1;
    }
    else if(cycle==2){
      cycleStyle = cycle2;
    }
    else{
      cycleStyle = cycle3;
    }

  /* --- SOUND SETUP --- */
  async function playSound(cryUrl: string) {
    try {
      // let the cry play even when an iPhone is on silent
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      // expo-av needs the URL wrapped as { uri }, a plain string isn't accepted on phones
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri: cryUrl },
        { shouldPlay: true }
      );
      setSound(soundObject);
    } catch (error) {
      console.warn('Could not play the Pokémon cry:', error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Plays the cry once the Pokémon is revealed AND its cry URL has arrived (whichever happens last)
  useEffect(() => {
    if (revealed && pkmnCry) {
      playSound(pkmnCry);
    }
  }, [revealed, pkmnCry]);
  
   /* --- AFTER RENDER CHANGES --- */
  useEffect(() => {

    if(reloadState==true){
      randomEncoutner();
      sethideState(GlobalStyles.unhidden);
      setTimeout(function(){
        setrevealState(GlobalStyles.unhidden);
        setRevealed(true);
      },3000);
      setTimeout(function(){
        sethideState(GlobalStyles.hidden);
      },5000);
    }
    else{
      //export from tab 2
      setRevealed(true);
      setrevealState(GlobalStyles.unhidden);
      sethideState(GlobalStyles.hidden);
    }
    setTimeout(function(){
      setreloadState(false);
    },5000);
  },[]);

  /* --- RENDER APP --- */
  return pkmn ? (
    <SafeAreaView style={GlobalStyles.indexcontainer}>
      <ImageBackground style={GlobalStyles.bgImg} source={require('../../assets/images/bg_img.webp')}>
        <ImageBackground style={[hideState,GlobalStyles.loadContainer]} source={require('../../assets/images/load.gif')}></ImageBackground>
        <Animated.Image source={{uri:pkmnImg}} style={[GlobalStyles.pkmnImg,cycleStyle,revealState]} resizeMode="contain"></Animated.Image>
        <LinearGradient style={GlobalStyles.indextxtBox} colors={['rgba(96,121,254,0.75) 100%)','rgba(40,54,128,1) 0%']}>
          <Text style={GlobalStyles.txt}>You encountered a wild <Text style={GlobalStyles.pkmnTxt}>{pkmnName}</Text>!</Text>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  ): null;
}