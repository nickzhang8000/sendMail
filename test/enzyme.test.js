import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import store from '../client/store';

const shallowWithStore = (component, store) => {
  const context = {
    store,
  }; 
  return shallow(component, { context });
};

describe('ConnectedShowBox', () => {
  it("should render successfully if string is not provided by store", () => {
    const testState = {
      showBox: {}
    };
    const store = createMockStore(testState)
    const component = shallowWithStore(<ConnectedShowBox />, store);
    expect(component).to.be.a('object');
  });
});
