import React from 'react';
import MessageList from '../components/MessageList';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import mockMessages from '../__mocks__/messages.json';
Enzyme.configure({ adapter: new Adapter()});

describe("MessageList", function() {
    it('renders without crashing', () => {
        const component = mount(<MessageList/>);
        expect(component).toMatchSnapshot();
    });
    it('has a message list', () => {
        const component = mount(<MessageList/>);
        expect(component.exists('ul#message_list')).toBe(true);
    });
    it('takes messages as props and displays them', () => {
        const component = shallow(<MessageList
          messages= {mockMessages}
          />);
      expect(component.find('ul#message_list').children().length).toBe(5);
    });
    it('if no messages provided as props displays "No Messages"', () => {
        const component = shallow(<MessageList/>);
      expect(component.find('ul#message_list').childAt(0).exists('li#no_messages')).toBe(true)
    });
    describe("delete messages",function() {
        it("each message displayed has a delete btn", function() {
            const component = shallow(<MessageList messages={mockMessages}
            />);
            expect(component.find('ul#message_list').childAt(0).exists('button#delete')).toBe(true);
        })
    })
    describe("update messages",function() {
        it("each message displayed has an update btn", function() {
            const component = shallow(<MessageList messages={mockMessages}
            />);
            expect(component.find('ul#message_list').childAt(0).exists('button#update')).toBe(true);
            expect(component.find('ul#message_list').childAt(2).find('#update').text()).toBe('Update');
        })
        it('update click changes button text', () => {
            const component = mount(<MessageList
              messages={mockMessages}
              loaded={true}
            />)
            component.find('ul#message_list').childAt(0).find('#update').simulate('click')
            expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
          });
    })
})