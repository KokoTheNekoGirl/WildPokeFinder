
import { StyleSheet } from 'react-native';
import { blackcolour, whitecolour, redcolour, reddarkcolour, yellowcolour } from '@/constants/Colors';

export const GlobalStyles = StyleSheet.create({

    // pokedex styles
    

    pokedexcontainer:{
        width: '100%',
        alignItems: 'center', 
        padding: 60,
      },

      blackline:{
        width: '50%',
        height: '100%',
        position: 'absolute',
        left: '25%',
        backgroundColor: blackcolour,
      },

    textstats: {
        color: blackcolour,
        fontSize: 14,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textdesc:{
        backgroundColor: blackcolour,
        color: whitecolour,
        padding: 10,
        fontWeight: 'bold',
        fontSize: 16,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    typerow: {
        position: 'absolute',
        bottom: 12,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 10,
    },

    typepill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 999,
        shadowColor: blackcolour,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.3,
    },

    typepilltext: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    abilitylist: {
        paddingVertical: 6,
    },

    abilitytext: {
        color: blackcolour,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 4,
    },

    abilityhidden: {
        fontWeight: 'normal',
        opacity: 0.7,
    },

    statlist: {
        padding: 10,
    },

    statrow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },

    statlabel: {
        width: 58,
        color: blackcolour,
        fontSize: 12,
        textAlign: 'right',
        opacity: 0.6,
    },

    statvalue: {
        width: 44,
        color: blackcolour,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingHorizontal: 8,
    },

    stattrack: {
        flex: 1,
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'rgba(20, 20, 20, 0.12)',
    },

    statbar: {
        height: '100%',
        borderRadius: 5,
    },

    pokemonimage: {
        width: 170,
        height: 170,
        zIndex: 100,
        shadowColor: blackcolour,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
      },

    pokemonbox: {
        backgroundColor: whitecolour,
        overflow: 'hidden',
        borderRadius: 5,
        aspectRatio: 1/1,
        width: '100%',
        maxWidth: 380,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: blackcolour,
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
      },

    pokemonstage: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // grass: {
    //     position: 'absolute',
    //     bottom: 20,
    //     left: '50%',
    //     transform: 'translateX(-50%)',
    //     width: '80%',
    //     height: 45,
    //     backgroundColor: '#57c759',
    //     backgroundImage: 'radial-gradient(circle,#57c759, #2eb87c)',
    //     borderRadius: 50,
    //     shadowColor: blackcolour,
    //     shadowRadius: 5,
    //     shadowOffset: { width: 2, height: 4 },
    //     shadowOpacity: 0.4,
    // },
    
    pokemonname:{
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        fontSize: 20,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        color: whitecolour,
        backgroundColor: blackcolour,
    },

    txtBox: {
        backgroundColor: whitecolour,
        borderRadius: 5,
        width: '48%',
        marginBottom: 20,
    },

    txtBoxFull:{
        backgroundColor: whitecolour,
        borderRadius: 5,
        width: '100%',
        marginBottom: 20,
    },

    txtBoxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 40,
        width: '100%',
        maxWidth: 380,
    },

    smalltext: {
        fontSize: 12,
        lineHeight: 16,
        padding: 10,
    },

    redbackground: {
        backgroundColor: redcolour,
        width: '100%',
        height: '100%',
    },
         
    headerstyle: {
        backgroundColor: reddarkcolour,
        borderBottomColor: 'none'
    },

    headertext: {
        color: whitecolour,
        marginLeft: 20,
    },

    navbackground: {
        backgroundColor: reddarkcolour,
        height: 90,
        borderTopColor: 'none'
    },

    tabtext:{
        fontSize: 14,
        fontWeight: 'bold',
    },

    iconstyles: {
        marginTop: 20,
        marginBottom: 10,
        width: 20,
        height: 20,
        color: whitecolour,
    },




    // inndex styles

    indexcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative',
      },
      bgImg:{
        position:"absolute",
        bottom:0,
        width: '100%',
        height: '100%',
        resizeMode: "cover"
      },
      loadContainer:{
        zIndex: 2,
        overflow: 'hidden',
        position: 'absolute',
        height: '100%',
        width:'100%',
        resizeMode: "cover"
      },
      unhidden:{
        opacity:100,
      },
      hidden:{
        opacity:0,
      },
      pkmnImg:{
        position:'absolute',
        width: '75%',
        left: '10%',
        top: '20%',
        height: '75%',
      },
      indextxtBox:{
        position:'absolute',
        bottom: 0,
        height: '20%', 
        width: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        borderRadius: 15,
        borderColor: '#ebdf22',
        borderWidth: 5,
        zIndex: 1
      },
      txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
      },
      pkmnTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#FFF'
      },
});