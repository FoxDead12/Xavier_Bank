import { COLORS } from '@bancary-account/bancary-styles-models';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Navigator } from './components/Navigator';

export const App = () => {

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.STATUSBAR} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
   
        <Navigator/>

      </SafeAreaView>
    </>
  );
};

export default App;
