import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount() {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => response.json())
      .then(responseJSON => { this.setState({ isLoading: false, usd: responseJSON.bpi.USD.rate, gbp: responseJSON.bpi.GBP.rate, eur: responseJSON.bpi.EUR.rate }) })
      .catch(err => console.log(err))

  }
  
  render() {
    let {usd, gbp, eur} = this.state
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text>Loading ...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>USD - {usd}</Text>
        <Text style={styles.text}>GBP - {gbp}</Text>
        <Text style={styles.text}>EUR - {eur}</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#79e2ff',
    fontSize: 35
  }
});
