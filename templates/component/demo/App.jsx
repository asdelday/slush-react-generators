import React from 'react';
import <?? name ?> from '../dist/<?? slugifiedName ?>';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Demo <?? name ?></h1>
        <<?? name ?> />
      </div>
    );
  }
}
