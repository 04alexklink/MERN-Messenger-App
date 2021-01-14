import React from 'react';
// import ReactDOM from 'react-dom';
import MessageApp from '../App';
import mockAxios from '../__mocks__/axios.js';
import mockMessages from '../__mocks__/messages.json';
import mockMessagesDeleted from '../__mocks__/messages_deleted.json';
import errorMock from '../__mocks__/error.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter()})

describe('MessageApp', () => {

  beforeEach(function(){
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({ data: [] }))
    mockAxios.get.mockImplementation(() =>
    Promise.resolve({data: mockMessages}))
    mockAxios.delete.mockImplementation(()=>
    Promise.resolve({ data: mockMessagesDeleted }))
  })

  afterEach(function(){
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
    mockAxios.delete.mockClear()
  })
  it('renders without crashing', () => {
    const component = mount(<MessageApp/>);
    expect(component).toMatchSnapshot();
  });
  it('has a textbox', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('textarea#message_box')).toBe(true);
  });
  it('has a submit button', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('button#submit')).toBe(true);
  });
  it('has a message list', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('ul#message_list')).toBe(true);
  });
  it('posts data and clears message box on submit success', () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } })
    component.find('form').simulate('submit')
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", {"content": "Hello"});
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  it('Loads data from api', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  it('deletes specific message data and removes it from list if that message btn clicked', async () => {
    const component = await mount(<MessageApp/>);
    await component.update();
    await component.find('ul#message_list').childAt(3).find('#delete').simulate('click')
    await component.update();
    expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:3001/delete/4", {"id": 4});
    expect(component.find('ul#message_list').children().length).toBe(4);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  describe('MessageApp erroring', () => {
    beforeEach(function(){
      mockAxios.post.mockImplementation(() =>
      Promise.reject(errorMock));
      mockAxios.get.mockImplementation(() =>
      Promise.reject(errorMock));
    })
    afterEach(function(){
      mockAxios.post.mockClear()
      mockAxios.get.mockClear()
    })
  it('loads err on GET err', async () => {
     const component = await mount(<MessageApp/>);
     await component.update()
     expect(mockAxios.get).toHaveBeenCalledTimes(1);
     expect(component.state().error).toEqual("error text from json mock");
     expect(component.find('#error').text()).toBe('Error: error text from json mock');
   });
  it('loads err on Post err', async () => {
      const component = mount(<MessageApp/>);
      component.find('textarea#message_box').simulate('change', { target: { value: 'bad string' } })
      await component.find('form').simulate('submit')
      await component.update()
      expect(mockAxios.post).toHaveBeenCalledTimes(1)
      expect(component.state().error).toEqual("error text from json mock");
      expect(component.find('#error').text()).toBe('Error: error text from json mock');
    });
  });
})
