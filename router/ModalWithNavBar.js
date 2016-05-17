/**
 * https://github.com/ocleo1
 * 
 * @providesModule ModalWithNavBar
 */

'use strict';

import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';

export default class ModalWithNavBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Modal
        animated={true}
        transparent={false}
        visible={true}
        onRequestClose={() => {}}>
        <View style={{flex: 1}}>
          <View style={{
            flex: .06,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'gray'}}>
            <View style={{flex: .15, alignItems: 'center', justifyContent: 'center'}}>
              { this.props.navigationBarMapper.LeftButton() }
            </View>
            <View style={{flex: .7, alignItems: 'center', justifyContent: 'center'}}>
              { this.props.navigationBarMapper.Title() }
            </View>
            <View style={{flex: .15, alignItems: 'center', justifyContent: 'center'}}>
              { this.props.navigationBarMapper.RightButton() }
            </View>
          </View>
          <View style={{flex: .94}}>
          { this.props.children }
          </View>
        </View>
      </Modal>
    );
  }
}
