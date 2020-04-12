import React from 'react';
import App from './App';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
Enzyme.configure({ adapter: new Adapter() });

import defaultStore from './redux/store';

describe("App Component", () => {

  const mockedStore = defaultStore; 
  const mountWithProvider = children => (store = mockedStore) => mount(<Provider store={store}>{children}</Provider>);

  test("Renders component", () => {
    window.scroll = jest.fn();
    let component = <App/>;
    const wrapper = mountWithProvider(component)();
    expect(wrapper.exists()).toBe(true);
  });
  
  // test("Changes step", () => {
  //   window.scroll = jest.fn();
  //   let component = <App/>;
  //   const wrapper = mountWithProvider(component)();
  //   expect(component.instance().changeStep(1)).toEqual(1);
  //   // verify some prop value
  //   //expect(wrapper.children().prop("questionId")).toBeGreaterThan(-1);
  //   //expect(component.instance().changeStep(1)).toEqual(1);
  // });

});
