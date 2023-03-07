import React from 'react';
import ChatContainer from './components/ChatContainer/ChatContainer';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Simple chat pagination</h1>
      <ChatContainer />
    </div>
  );
};

export default App;
