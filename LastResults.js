import axios from "axios";
import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { DataTable } from "react-native-paper";

class LastResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      race: [],
      loading: true
    };
  }

  componentDidMount() {
    axios("http://ergast.com/api/f1/current/last/results.json").then(response =>
      this.setState({
        race: response.data.MRData.RaceTable.Races[0],
        loading: false
      })
    );
  }

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#9bf0dd" />
        ) : (
          <DataTable>
            <DataTable.Header>
              <View style={{ width: 20 }}>
                <DataTable.Title>#</DataTable.Title>
              </View>
              <DataTable.Title>Driver</DataTable.Title>
              <DataTable.Title>Constructor</DataTable.Title>
              <DataTable.Title>Time</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {this.state.race.Results.map(result => {
                return (
                  <DataTable.Row key={result.position}>
                    <View style={{ width: 20 }}>
                      <DataTable.Cell>{result.position}</DataTable.Cell>
                    </View>

                    <DataTable.Cell>{result.Driver.familyName}</DataTable.Cell>
                    <DataTable.Cell>{result.Constructor.name}</DataTable.Cell>
                    <DataTable.Cell>
                      {result.Time ? result.Time.time : "N/A"}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        )}
      </View>
    );
  }
}

export default LastResults;
