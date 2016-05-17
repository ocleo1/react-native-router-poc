/**
 * https://github.com/ocleo1
 * 
 * @providesModule Router
 */

'use strict';

import React, { Component } from 'react';
import { View, Navigator } from 'react-native';

import Modal from './ModalWithNavBar';
import {
  getEmitterInstance,
  PUSH,
  REPLACE,
  POP,
  POP_TO_ROUTE,
  POP_TO_TOP,
  OPEN_MODAL,
  CLOSE_MODAL
} from './Emitter';

const NEXT = true;
const BACK = false;

export default class Router extends Component {
  constructor(props) {
    super(props);
    this._subscribableSubscriptions = [];
    this._modalRefs = [];

    var route = this.props.children.filter((child) => child.props.initial)[0];
    this.state = {
      initialComponentName: route.props.name,
      initialComponent: route.props.component,
      navigationBarMapper: {
        LeftButton: route.props.component.LeftButton,
        RightButton: route.props.component.RightButton,
        Title: route.props.component.Title
      },
      modals: []
    };

    this._push = this._push.bind(this);
    this._replace = this._replace.bind(this);
    this._pop = this._pop.bind(this);
    this._popToRoute = this._popToRoute.bind(this);
    this._popToTop = this._popToTop.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  componentDidMount() {
    this._addListenerOn(getEmitterInstance(), PUSH, this._push);
    this._addListenerOn(getEmitterInstance(), REPLACE, this._replace);
    this._addListenerOn(getEmitterInstance(), POP, this._pop);
    this._addListenerOn(getEmitterInstance(), POP_TO_ROUTE, this._popToRoute);
    this._addListenerOn(getEmitterInstance(), POP_TO_TOP, this._popToTop);
    this._addListenerOn(getEmitterInstance(), OPEN_MODAL, this._openModal);
    this._addListenerOn(getEmitterInstance(), CLOSE_MODAL, this._closeModal);
  }
  componentWillUnmount() {
    this._subscribableSubscriptions.forEach(
      (subscription) => subscription.remove()
    );
    this._subscribableSubscriptions = null;
  }

  _addListenerOn(eventEmitter, eventType, listener, context) {
    this._subscribableSubscriptions.push(
      eventEmitter.addListener(eventType, listener, context)
    );
  }
  _push(navigator, name) {
    if (this._componentRef.transition) {
      this._componentRef.transition(NEXT);
    }

    var route = this.props.children.filter((child) => child.props.name === name)[0];
    navigator.push({
      name: name,
      component: route.props.component
    });
    
    this.setState({
      navigationBarMapper: {
        LeftButton: route.props.component.LeftButton,
        RightButton: route.props.component.RightButton,
        Title: route.props.component.Title
      }
    });
  }
  _replace(navigator, name) {
    if (this._componentRef.transition) {
      this._componentRef.transition(NEXT);
    }

    var route = this.props.children.filter((child) => child.props.name === name)[0];
    navigator.replace({
      name: name,
      component: route.props.component
    });
    
    this.setState({
      navigationBarMapper: {
        LeftButton: route.props.component.LeftButton,
        RightButton: route.props.component.RightButton,
        Title: route.props.component.Title
      }
    });
  }
  _pop(navigator, route) {
    if (this._componentRef.transition) {
      this._componentRef.transition(BACK);
    }

    navigator.pop();
    
    this.setState({
      navigationBarMapper: {
        LeftButton: route.component.LeftButton,
        RightButton: route.component.RightButton,
        Title: route.component.Title
      }
    });
  }
  _popToRoute(navigator, route) {
    if (this._componentRef.transition) {
      this._componentRef.transition(BACK);
    }

    navigator.popToRoute(route);
    
    this.setState({
      navigationBarMapper: {
        LeftButton: route.component.LeftButton,
        RightButton: route.component.RightButton,
        Title: route.component.Title
      }
    });
  }
  _popToTop(navigator, route) {
    if (this._componentRef.transition) {
      this._componentRef.transition(BACK);
    }

    navigator.popToTop();
    
    this.setState({
      navigationBarMapper: {
        LeftButton: route.component.LeftButton,
        RightButton: route.component.RightButton,
        Title: route.component.Title
      }
    });
  }
  _openModal(name) {
    if (this._componentRef.transition) {
      this._componentRef.transition(NEXT);
    }

    var route = this.props.children.filter((child) => child.props.name === name)[0];
    var modal = (
      <Modal
        key={route.props.name}
        navigationBarMapper={{
          LeftButton: route.props.component.LeftButton,
          RightButton: route.props.component.RightButton,
          Title: route.props.component.Title
        }}>
        {
          React.createElement(route.props.component, {
            ref: (ref) => {
              this._componentRef = ref;
              this._modalRefs.push(ref);
            }
          })
        }
      </Modal>
    );

    this.state.modals.push(modal)
    this.setState({ modals: this.state.modals });
  }
  _closeModal() {
    if (this._componentRef.transition) {
      this._componentRef.transition(BACK);
    }

    this._modalRefs.pop();
    var length = this._modalRefs.length;
    this._componentRef = length === 0 ? this._compRef : this._modalRefs[length];

    this.state.modals.pop();
    this.setState({ modals: this.state.modals });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator
          initialRoute={{
            name: this.state.initialComponentName,
            index: 0,
            component: this.state.initialComponent
          }}
          renderScene={(route, navigator) => React.createElement(route.component, {
            ref: (ref) => { this._componentRef = this._compRef = ref }
          })}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={this.state.navigationBarMapper}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                backgroundColor: '#efefef'
              }} />
          } />
        { this.state.modals }
      </View>
    );
  }
}
