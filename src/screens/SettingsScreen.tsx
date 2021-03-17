import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';
import {
  SettingsScreenNavigationProp,
  SettingsScreenRouteProp,
} from '../utils/types';
import { theme } from '../utils/theme';

interface Props {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
}

export const SettingsScreen: FC<Props> = ({ navigation }) => {
  const [refreshInterval, setRefreshInterval] = useState<string>('10');
  const [error, setError] = useState<string>('');

  const handleSave = async () => {
    try {
      if (refreshInterval) {
        await AsyncStorage.setItem('interval', refreshInterval + '000');
      }
      alert('The settings have been changed successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="never"
      contentContainerStyle={styles.container}>
      <TextInput
        theme={theme}
        value={refreshInterval}
        onChangeText={text => {
          setRefreshInterval(text);
          if (Number.isNaN(Number(text))) {
            setError('Please put an actual number');
          } else {
            setError('');
          }
        }}
        keyboardType="decimal-pad"
        label="Refresh interval (s)"
        style={styles.input}
      />
      <Text style={{ color: 'red' }}>{error}</Text>
      <View style={styles.buttons}>
        <Button
          theme={theme}
          disabled={error !== ''}
          onPress={handleSave}
          labelStyle={styles.buttonLabel}>
          SAVE
        </Button>
        <Button
          theme={theme}
          onPress={() => navigation.goBack()}
          labelStyle={styles.buttonLabel}>
          BACK
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttons: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: '#3498db',
  },
  input: {},
});
