import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20,
    },
    container2:{
       
        alignItems:'center',
        
      },
    list: {
      
      paddingHorizontal: 5,
      
     
    },
    listContainer:{
      alignItems:'center'
    },
    /******** card **************/
    card:{
      shadowColor: '#00000021',
  
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
      marginVertical: 10,
      backgroundColor:"white",
      flexBasis: '42%',
      marginHorizontal: 10,
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardImage:{
      height: 70,
      width: 70,
      alignSelf:'center'
    },
    title:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#696969"
    },cardRounded:{
        shadowColor: '#474747',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
    
        elevation: 12,
        marginVertical: 20,
        marginHorizontal: 40,
        backgroundColor:"#e2e2e2",
        //flexBasis: '42%',
        width:180,
        height:180,
        borderRadius:90,
        alignItems:'center',
        justifyContent:'center'
      }
  });   
                 