/**
 * https://github.com/ocleo1
 * 
 * @providesModule Router
 */

'use strict';

import React, { Component } from 'react';
import { Navigator } from 'react-native';

export default class Router extends Component {
  constructor(props) {
    super(props);

    var route = this.props.children.filter((child) => child.props.initial)[0];
    this.state = {
      initialComponentName: route.props.name,
      initialComponent: route.props.component,
      navigationBarMapper: {
        LeftButton: route.props.component.LeftButton,
        RightButton: route.props.component.RightButton,
        Title: route.props.component.Title
      }
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: this.state.initialComponentName,
          index: 0,
          component: this.state.initialComponent
        }}
        renderScene={(route, navigator) => React.createElement(route.component, null)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={this.state.navigationBarMapper}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              backgroundColor: '#efefef'
            }} />
        } />
    );
  }
}
