import React from "react";
import { Text, Linking, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";

const DriverInfo = ({ route }) => {
  const info = route.params;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Personal Profile</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Name</DataTable.Cell>
        <DataTable.Cell numeric>
          {`${info.givenName} ${info.familyName}`}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Date of birth</DataTable.Cell>
        <DataTable.Cell numeric>{info.dateOfBirth}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Nationality</DataTable.Cell>
        <DataTable.Cell numeric>{info.nationality}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Biography</DataTable.Cell>
        <TouchableOpacity onPress={() => Linking.openURL(info.url)}>
          <DataTable.Cell>
            <Text style={{ color: "blue" }}>Open Wiki</Text>
          </DataTable.Cell>
        </TouchableOpacity>
      </DataTable.Row>
    </DataTable>
  );
};

export default DriverInfo;
