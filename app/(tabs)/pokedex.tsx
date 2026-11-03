import React, { useState, useEffect } from 'react';
import { Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { GlobalStyles } from '@/components/Styles';
import { getTypeStyle } from '@/constants/PokemonTypes';
import {
  PokemonAbility,
  PokemonStat,
  getStatBarWidth,
  getStatRank,
  parseAbilities,
  parseStats,
  parseTypes,
  pickEnglishFlavorText,
} from '@/utils/pokemon';


import { pkdex } from './index';

/* --- APP EXPORT --- */
export default function TabTwoScreen() {
  const [pkmn, setPkmn] = useState<object | null>(null);
  const [pkmnImg, setPkmnImg] = useState<string | undefined>(undefined);
  const [pkmnName, setPkmnName] = useState('');
  const [pkmnHeight, setPkmnHeight] = useState('');
  const [pkmnWeight, setPkmnWeight] = useState('');
  const [pkmnTypes, setPkmnTypes] = useState<string[]>([]);
  const [pkmnAbilities, setPkmnAbilities] = useState<PokemonAbility[]>([]);
  const [pkmnDesc, setPkmnDesc] = useState<string | null>(null);
  const [pkmnStats, setPkmnStats] = useState<PokemonStat[]>([]);

  /* --- DATA FETCHING --- */

  const randomEncounter = () => {

    fetch('https://pokeapi.co/api/v2/pokemon/' + pkdex)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPkmn(data);
        setPkmnImg(data.sprites.front_default ?? undefined);
        setPkmnName(data.name.toUpperCase());
        setPkmnHeight(data.height * 10 + ' cm');
        setPkmnWeight(data.weight / 10 + ' kg');
        setPkmnTypes(parseTypes(data.types));
        setPkmnAbilities(parseAbilities(data.abilities));
        setPkmnStats(parseStats(data.stats));
      })
      .catch((error) => console.warn('Could not load Pokémon data:', error));

      fetch('https://pokeapi.co/api/v2/pokemon-species/' + pkdex)
      .then((response) => {
        return response.json();
      })
      .then((data2) => {
        // flavor_text_entries is in many languages, so pick the English one
        setPkmnDesc(pickEnglishFlavorText(data2.flavor_text_entries) ?? 'No English description available.');
      })
      .catch((error) => console.warn('Could not load Pokémon description:', error));
  };

  useEffect(() => {
    randomEncounter();
  }, []);

  const pkmnTotal = pkmnStats.reduce((sum, stat) => sum + stat.value, 0);

    /* --- RENDER APP --- */
  return pkmn ? (
    <ScrollView style={GlobalStyles.redbackground}>
      <View style={GlobalStyles.blackline}></View>
        <View style={GlobalStyles.pokedexcontainer}>

          <ImageBackground style={GlobalStyles.pokemonbox} source={require('../../assets/images/bg_img2.jpeg')}>
            <Text style={GlobalStyles.pokemonname}>{pkmnName}</Text>
            <View style={GlobalStyles.pokemonstage}>
              {/* <View style={GlobalStyles.grass}></View> */}
              <Image source={{ uri: pkmnImg }} style={GlobalStyles.pokemonimage} />
            </View>
            <View style={GlobalStyles.typerow}>
              {pkmnTypes.map((typeName) => {
                const type = getTypeStyle(typeName);
                return (
                  <View key={typeName} style={[GlobalStyles.typepill, { backgroundColor: type.color }]}>
                    <FontAwesome6 name={type.icon} {...(type.brand ? { brand: true } : { solid: true })} size={14} color={type.textColor} />
                    <Text style={[GlobalStyles.typepilltext, { color: type.textColor }]}>{type.label}</Text>
                  </View>
                );
              })}
            </View>
          </ImageBackground>

          <View style={GlobalStyles.txtBoxContainer}>
          <View style={GlobalStyles.txtBoxFull}>
              <Text style={GlobalStyles.textdesc}>Description</Text>
              <Text style={GlobalStyles.smalltext}>{pkmnDesc}</Text>
            </View>
            <View style={GlobalStyles.txtBox}>
              <Text style={GlobalStyles.textdesc}>Height</Text>
              <Text style={GlobalStyles.textstats}>{pkmnHeight}</Text>
            </View>
            <View style={GlobalStyles.txtBox}>
              <Text style={GlobalStyles.textdesc}>Weight</Text>
              <Text style={GlobalStyles.textstats}>{pkmnWeight}</Text>
            </View>
            <View style={GlobalStyles.txtBoxFull}>
              <Text style={GlobalStyles.textdesc}>Abilities</Text>
              <View style={GlobalStyles.abilitylist}>
                {pkmnAbilities.map((ability) => (
                  <Text key={ability.name} style={GlobalStyles.abilitytext}>
                    {ability.name}
                    {ability.hidden ? <Text style={GlobalStyles.abilityhidden}> (Hidden)</Text> : null}
                  </Text>
                ))}
              </View>
            </View>
            <View style={GlobalStyles.txtBoxFull}>
              <Text style={GlobalStyles.textdesc}>Base Stats</Text>
              <View style={GlobalStyles.statlist}>
                {pkmnStats.map((stat) => (
                  <View key={stat.key} style={GlobalStyles.statrow}>
                    <Text style={GlobalStyles.statlabel}>{stat.label}</Text>
                    <Text style={GlobalStyles.statvalue}>{stat.value}</Text>
                    <View style={GlobalStyles.stattrack}>
                      <View
                        style={[
                          GlobalStyles.statbar,
                          { width: `${getStatBarWidth(stat.value)}%`, backgroundColor: getStatRank(stat.value).color },
                        ]}
                      />
                    </View>
                  </View>
                ))}
                <View style={GlobalStyles.statrow}>
                  <Text style={GlobalStyles.statlabel}>Total</Text>
                  <Text style={GlobalStyles.statvalue}>{pkmnTotal}</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View>

        </View>
    </ScrollView>
  ) : null;
}
