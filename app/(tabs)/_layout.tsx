import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

import { GlobalStyles } from '@/components/Styles';

import { whitecolour, yellowcolour } from '@/constants/Colors';

//import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import EncounterIcon from '@/assets/images/pokeballicon.png';
import PokedexIcon from '@/assets/images/pokedexicon.png';

export default function TabLayout() {

    return (
    <Tabs 
    
      screenOptions={{
        tabBarActiveTintColor: yellowcolour,
        tabBarInactiveTintColor: whitecolour,
        headerTitle: '',
        tabBarStyle: GlobalStyles.navbackground,
        headerStyle: GlobalStyles.headerstyle,
        
        // headerLeft: () => (
        //   <Text style={GlobalStyles.headertext}>Next Random Pokemon</Text>
        // ),
        
      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Encounter',
          tabBarIcon: () => <Image style={GlobalStyles.iconstyles} source={EncounterIcon} />,
          tabBarLabelStyle: GlobalStyles.tabtext,
          
        }}
      />
      <Tabs.Screen
        name="pokedex"
        options={{
          title: 'Pokedex',
          tabBarIcon: () => <Image style={GlobalStyles.iconstyles} source={PokedexIcon} />,
          tabBarLabelStyle: GlobalStyles.tabtext,
        }}
      />
    </Tabs>
  );
}
