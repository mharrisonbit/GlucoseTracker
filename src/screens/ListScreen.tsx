import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { List, Text, Surface, FAB } from "react-native-paper";
import { getReadings } from "../utils/db";
import { GlucoseReading } from "../types";
import moment from "moment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

export const ListScreen: React.FC<Props> = ({ navigation }) => {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const data = await getReadings();
      setReadings(data);
    } catch (error) {
      console.error("Error loading readings:", error);
    }
  };

  const renderItem = ({ item }: { item: GlucoseReading }) => (
    <Surface style={styles.itemSurface}>
      <List.Item
        title={`${item.value} mg/dL`}
        description={`${moment(item.timestamp).format("MMM D, YYYY h:mm A")}${
          item.notes ? `\n${item.notes}` : ""
        }`}
        left={(props) => <List.Icon {...props} icon="water" />}
      />
    </Surface>
  );

  return (
    <View style={styles.container}>
      {readings.length === 0 ? (
        <Text style={styles.emptyText}>No readings yet</Text>
      ) : (
        <FlatList
          data={readings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString() || item.timestamp}
          contentContainerStyle={styles.list}
        />
      )}
      <FAB
        icon="chart-line"
        style={styles.fab}
        onPress={() => navigation.navigate("Chart")}
        label="View Chart"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 16,
    paddingBottom: 80, // Add padding for FAB
  },
  itemSurface: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
});
