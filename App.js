import React from 'react';
import ReactDOM from 'react-dom';

export const App = (props) => {
  const { loading } = props;

  return (
    <>
      <div id="menu" />
      <div id="viewport" />
      {loading && <h4>Loading...</h4>}
    </>
  );
};

const renderApp = ({ loading }) => {
  const container = document.getElementById('root');
  ReactDOM.render(<App loading={loading} />, container);
};

export default renderApp;
