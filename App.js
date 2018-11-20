import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import LineChart from "react-native-responsive-linechart";


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  getData() {
    let close = 'https://api.coindesk.com/v1/bpi/historical/close.json'
      return new Promise((resolve, reject) => {
        fetch(close)
         .then(res => res.json())
         .then(data => {
           
          this.setState({ chart: data.bpi })})
        .then(() => {
          fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
           .then(response => response.json())
           .then(responseJSON => { this.setState({ isLoading: false, usd: responseJSON.bpi.USD.rate, gbp: responseJSON.bpi.GBP.rate, eur: responseJSON.bpi.EUR.rate }) })
           .catch(err => console.log(err))
        })

      });

  }
  async componentDidMount() {
    await this.getData()
    
  }
  
  render() {
    let {usd, gbp, eur} = this.state
    const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
    const config = {
  line: {
    strokeWidth: 1,
    strokeColor: "#216D99"
  },
  area: {
    gradientFrom: "#2e86de",
    gradientFromOpacity: 1,
    gradientTo: "#87D3FF",
    gradientToOpacity: 1
  },
  yAxis: {
    labelColor: "#c8d6e5"
  },
  grid: {
    strokeColor: "#c8d6e5",
    stepSize: 30
  },
  insetY: 10,
  insetX: 10,
  interpolation: "spline",
  backgroundColor: "#fff"
};
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text>Loading ...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <LineChart style={{ flex: 1 }} config={config} data={data} />
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
