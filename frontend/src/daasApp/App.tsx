import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Footer } from './component/Header'
import { Main } from './component/Main'

function App() {
  return (
    <>
      <Header title="DaaS" text="Database as a Service webapp" />
      <Main />
      <Footer />
    </>
  );
}

export default App;
