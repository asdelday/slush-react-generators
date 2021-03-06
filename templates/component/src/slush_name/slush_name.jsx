import React, { PropTypes } from 'react';
import cx from 'classnames';
import './<?? name ?>.scss';

export default class <?? name ?> extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  componentDidMount() {
    console.log('mounted'); // eslint-disable-line
  }

  render() {
    const { className } = this.props;

    return (
      <div className={ cx(className, '<?? name ?>') }>
        I'm <?? name ?>
      </div>
    );
  }
}
