import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AVIProvider } from './context/AVIContext';
import AVIFormContainer from './components/AVIFormContainer';

function App() {
  return (
    <AVIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AVIFormContainer />} />
          </Route>
        </Routes>
      </Router>
    </AVIProvider>
  );
}

export default App;
