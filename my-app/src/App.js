import React from 'react';
//import logo from './logo.svg';
import './App.css';
import demo from './demo.png';
//import prev from './res/svg/left-arrow.svg';
//import next from './res/svg/right-arrow.svg';
import {content} from './res/demo/res';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="reader maxHeight">
        <div className="col readerText"> 
          <h2 className="fontOswald">Heading Article</h2>
          {content.section.map((para, i) => <p key={i}>{para}</p>)}
          <div className="controls">
            <button className="button"> ◀ </button>
            2
            <button className="button"> ▶ </button>
          </div>
        </div>
        <div className="col readerMedia"><img width="100%" src={demo} alt=""/></div>
      </div>
    </div>
  );
}

export default App;
