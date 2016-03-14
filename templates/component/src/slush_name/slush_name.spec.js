import React from 'react';
import { shallow, mount } from 'enzyme';
import <?? name ?> from './<?? name ?>';

describe('<?? name ?>', function() {
  it('should has two ButtonComponent', () => {
    const wrapper = shallow(<<?? name ?> />);
    expect(wrapper.text()).to.contain('<?? name ?>');
  });

  it('calls componentDidMount', () => {
    sinon.spy(<?? name ?>.prototype, 'componentDidMount');
    const wrapper = mount(<<?? name ?> />);
    expect(<?? name ?>.prototype.componentDidMount.calledOnce).to.be.true;
    <?? name ?>.prototype.componentDidMount.restore();
  });
});
