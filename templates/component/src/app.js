import React from 'react';
import { render } from 'react-dom';
import <?? name ?> from './index';

(() => {
  const app = document.getElementById('react-view');
  render(<<?? name ?> />, app);
})();
