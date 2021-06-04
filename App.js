import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Alert,Button,ImageBackground } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
export default class App extends React.Component {
  constructor(props){
    super(props)
      this.state={
      gameState:[ 
        [0,0,0],
        [0,0,0],
        [0,0,0]
        ],
      currentPlayer:1,
    }

  }
  componentDidMount(){
        this.initializegame();
  }
initializegame=()=>{
  this.setState({gameState:
  [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ],
  currentPlayer:1
  })
}

renderIcon=(row,col)=>{
  var value=this.state.gameState[row][col];
  switch(value)
  {
    case 1: return<Icon name="close" style={styles.tilex}/>
    case -1: return<Icon name="circle-outline" style={styles.tileo} />
    default:return<View/>
  }
}

tilepress=(row,col)=>{

//dont allow to change override the tile
var value=this.state.gameState[row][col]
if(value!==0){return;}

var currentPlayer=this.state.currentPlayer;

//set to correct player
var arr=this.state.gameState.slice()
arr[row][col]=currentPlayer
this.setState({gameState:arr})


var nextPlayer=(currentPlayer==1)?-1:1
this.setState({currentPlayer:nextPlayer})

//check winners
var winner=this.getWinner()

if(winner==1){
  Alert.alert("player 1 is the winner");
  this.initializegame();
}
else if(winner==-1){
   Alert.alert("player 2 is the winner")
  this.initializegame()
}

}

getWinner=()=>{
  var sum
  var numTiles=3
  var arr=this.state.gameState
  //rowcheck
  
  for(var i=0;i<numTiles;i++){
    sum=arr[i][0]+arr[i][1]+arr[i][2]
    if(sum==3){
      return 1
    }
    else if(sum==-3){return -1}
  }

  //col check
for(var i=0;i<numTiles;i++){
sum=arr[0][i]+arr[1][i]+arr[2][i]
if(sum==3){return 1}
else if(sum==-3){return -1}

}

//check for diagonal
sum=arr[0][0]+arr[1][1]+arr[2][2]
if(sum==3){
  return 1
}
else if(sum==-3){return -1}

sum=arr[2][0]+arr[1][1]+arr[0][2]
if(sum==3){
  return 1
}
else if(sum==-3){return -1}

//draw case
return 0

}

newGame=()=>{
  this.initializegame()
}

  render(){
  return (
    <View style={styles.container}>
    <ImageBackground source={require("./assets/a.jpg")} style={styles.bgimg}>
    <View style={styles.arrange}>
      <View style={{flexDirection:"row"}}>
     <TouchableOpacity 
     onPress={()=>{this.tilepress(0,0)}}
     style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0}]}>
    {this.renderIcon(0,0)}
     </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{borderTopWidth:0}]}
     onPress={()=>{this.tilepress(0,1)}}
     >
     {this.renderIcon(0,1)}
     </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{borderRightWidth:0,borderTopWidth:0}]}
     onPress={()=>{this.tilepress(0,2)}}
     >
      {this.renderIcon(0,2)}
      </TouchableOpacity>
     </View>
      <View style={{flexDirection:"row"}}>
     <TouchableOpacity style={[styles.tile,{borderLeftWidth:0}]}
     onPress={()=>{this.tilepress(1,0)}}
     >
      {this.renderIcon(1,0)}
       </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{}]}
     onPress={()=>{this.tilepress(1,1)}}
     >
      {this.renderIcon(1,1)}
      </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{borderRightWidth:0}]}
     onPress={()=>{this.tilepress(1,2)}}
     >
     {this.renderIcon(1,2)}
      </TouchableOpacity>
     </View>
      <View style={{flexDirection:"row"}}>
     <TouchableOpacity style={[styles.tile,{borderBottomWidth:0,borderLeftWidth:0}]}
     onPress={()=>{this.tilepress(2,0)}}
     >
      {this.renderIcon(2,0)}
      </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{borderBottomWidth:0}]}
     onPress={()=>{this.tilepress(2,1)}}
     >
      {this.renderIcon(2,1)}
      </TouchableOpacity>
     <TouchableOpacity style={[styles.tile,{borderBottomWidth:0,borderRightWidth:0}]}
     onPress={()=>{this.tilepress(2,2)}}
     >
      {this.renderIcon(2,2)}
      </TouchableOpacity>
     </View>
    
    </View>
     <View style={{padding:60}}>
<Button title="New Game" color="#581845" onPress={()=>{this.newGame()}}/>
     </View>
     </ImageBackground>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#DAF7A6',

  },
  arrange:{
justifyContent:"center",
alignItems:"center"
  },

  tile:{
  borderWidth:10,
  width:100,
  height:100,
  alignItems:"center",
  justifyContent:"center",
 borderColor:"#581845",
  borderRadius:10
  },
  tilex:{
    color:"red",
    fontSize:60,
  },
  tileo:{
    

    color:"green",
    fontSize:60,
    

  },
  bgimg:{resizeMode:"cover",flex:1,justifyContent:"center"}
});
