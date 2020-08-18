import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  StyleSheet
} from "react-native";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drivers: [],
      loading: true,
      offset: 0,
      limit: 10
    };
  }

  loadData = () => {
    axios(
      `http://ergast.com/api/f1/drivers.json?limit=${this.state.limit}&offset=${this.state.offset}`
    ).then(response =>
      this.setState({
        drivers: response.data.MRData.DriverTable.Drivers,
        loading: false
      })
    );
  };
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  onPressDriverButton = item => {
    this.props.navigation.navigate("Driver Info", item);
  };

  onPressLastRaceButton = () => {
    this.props.navigation.navigate("Last Race");
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#9bf0dd" />
        ) : (
          <View style={styles.list}>
            <View style={styles.btn}>
              <Button
                onPress={() => this.onPressLastRaceButton()}
                title=" Go To Last Race Results"
                color={Platform.OS == "ios" ? "#9bf0dd" : "#000"}
              />
            </View>
            <FlatList
              data={this.state.drivers}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() => this.onPressDriverButton(item)}
                  >
                    <View style={styles.item}>
                      <Text
                        style={styles.text}
                      >{`${item.familyName}, ${item.givenName}`}</Text>
                    </View>
                  </TouchableOpacity>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={line => line.driverId}
            />
            <View style={styles.pagination}>
              {this.state.offset > 0 ? (
                <View>
                  <Button
                    onPress={() => {
                      this.setState({
                        offset: this.state.offset - 10
                      });
                    }}
                    title="Back"
                    color="#000"
                  />
                </View>
              ) : (
                <View></View>
              )}
              <View>
                <Button
                  onPress={() => {
                    this.setState({
                      offset: this.state.offset + 10
                    });
                  }}
                  title="Next"
                  color="#000"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  item: {
    backgroundColor: "#9bf0dd",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff"
  },
  list: { flex: 1 },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  btn: {
    backgroundColor: "black",
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 16
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 12
  }
});

export default Home;
