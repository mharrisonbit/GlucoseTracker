import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getReadings } from "../utils/db";
import { GlucoseReading } from "../types";
import moment from "moment";
import { Text } from "react-native-paper";

export const ChartScreen: React.FC = () => {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const data = await getReadings();
      setReadings(data.slice(0, 10).reverse()); // Show last 10 readings
    } catch (error) {
      console.error("Error loading readings:", error);
    }
  };

  if (readings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No readings to display</Text>
      </View>
    );
  }

  const data = {
    labels: readings.map((reading) =>
      moment(reading.timestamp).format("MM/DD")
    ),
    datasets: [
      {
        data: readings.map((reading) => reading.value),
        color: (opacity = 1) => `rgba(71, 136, 199, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Glucose Trends</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    color: "#666",
  },
});
