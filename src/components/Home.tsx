import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

export default Home;