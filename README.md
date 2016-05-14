# react-native-router-poc
React Native Router. Trying to use official component only.

## Example
```js
import { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {
  getEmitterInstance,
  REPLACE
} from './router/Emitter';
import Router from './router/Router';
import Route from './router/Route';

class Scene extends Component {
  static LeftButton(route, navigator, index, navState) {
    if (index === 0) return null;
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{marginVertical: 10, paddingLeft: 10}}>
          <Text style={{fontSize: 16}}>Back</Text>
        </View>
      </TouchableOpacity>
    );
  }
  static RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
        getEmitterInstance().emit(REPLACE, navigator, 'scene2');
      }}>
        <View style={{marginVertical: 10, paddingRight: 10}}>
          <Text style={{fontSize: 16}}>Next</Text>
        </View>
      </TouchableOpacity>
    );
  }
  static Title(route, navigator, index, navState) {
    return (
      <View sytle={{paddingVertical: 9}}>
        <Text style={{fontSize: 16, color: '#373E4D', fontWeight: '500'}}>Scene</Text>
      </View>
    ); 
  }

  render() {
    return (
      <View>
        <Text>
          Welcome to Scene!
        </Text>
      </View>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Route name="scene" component={Scene} initial={true}/>
        <Route name="compName" component={Component}/>
        <Route name="anotherCompName" component={AnotherComponent}/>
      </Router>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
```
