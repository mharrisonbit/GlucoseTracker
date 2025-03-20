import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Surface, FAB } from "react-native-paper";
import { addReading } from "../utils/db";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import moment from "moment";

type Props = NativeStackScreenProps<RootStackParamList, "Input">;

export const InputScreen: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (!value) return;

    try {
      await addReading({
        value: parseFloat(value),
        timestamp: moment().format(),
        notes: notes.trim() || undefined,
      });
      setValue("");
      setNotes("");
      navigation.navigate("List");
    } catch (error) {
      console.error("Error saving reading:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <TextInput
          label="Blood Glucose Level"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          style={styles.input}
          mode="outlined"
          multiline
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!value}
          style={styles.button}
        >
          Save Reading
        </Button>
      </Surface>
      <FAB
        icon="format-list-bulleted"
        style={styles.fab}
        onPress={() => navigation.navigate("List")}
        label="View History"
        color="#ffffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
});
