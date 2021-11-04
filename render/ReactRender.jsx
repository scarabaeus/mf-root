import React from 'react';
import ReactDOM from 'react-dom';

function Render(props) {
  const { loading } = props;

  return (
    <>
      <div id="menu" />
      <div id="viewport" />
      {loading && <h4>Loading...</h4>}
    </>
  );
}

export default function render({ loading }) {
  const container = document.getElementById('root');
  ReactDOM.render(<Render loading={loading} />, container);
}
