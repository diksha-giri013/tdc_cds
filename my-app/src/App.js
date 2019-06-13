import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
//import demo from './demo.png';
//import prev from './res/svg/left-arrow.svg';
//import next from './res/svg/right-arrow.svg';
import {courses} from './res/demo/res';

const styles = {
  disabled: {
    display: 'none'
  },
  enabled: {
    display: 'initial'
  }
}

function App() {
  //Hook for page number
  const [page, setPage] = useState(1); 

  //Hook for reader content
  let initialWorks = {1:{heading:"", metaData:["",""], sectionData:{subHeading:{1:"", 2:""}, media:{},content:{1:[""],2:[""]}}}};
  const [mod, setMod] = useState(initialWorks[1]);
  useEffect(() => {
    setMod(courses.design[1]);
    console.log(mod);
  },[mod]); 
  //component for reader content
  const Reader = () => {
    return(
      <div className="reader maxHeight">
        <div id="readerText" className="col readerText"> 
          <h2 className="fontOswald">{mod.heading[0]} <span className="fontOswald highlight">{mod.heading[1]}</span> </h2>
          <p className="fontOswald metaData">By {mod.metaData[1]} &nbsp; &nbsp;<span className="date">{mod.metaData[0]}</span></p> 
          <h3 className="subHeading">{page}. &nbsp;{mod.sectionData.subHeading[page]}</h3>
          {mod.sectionData.content[page].map((para, i) => <p key={i}>{para}</p>)}
          <Control/>
        </div>
        <div className="col readerMedia"><img width="100%" src={mod.sectionData.media[page]} alt=""/></div>
      </div>
    );
  }

  //Hook for reader control bar
  const size = Object.keys(mod.sectionData.content).length;
  let initialButton = {prev : styles.disabled,next: styles.enabled};
  const [inputPage, setInputPage] = useState(page);
  const [button, setButton] = useState(initialButton);
  useEffect(() => {
    if(page>1)
      setButton({prev: styles.enabled, next: styles.enabled});
    if(page===1)
      setButton({prev: styles.disabled, next: styles.enabled});  
    if(page===size)
      setButton({prev: styles.enabled, next: styles.disabled});  
  },[page, size]);
  //component for reader control bar
  const Control = () => {
    const handleChange = (e) => {
      setInputPage(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      setPage(parseInt(inputPage));
    }
    return(
      <div className="controls">
        <button style={button.prev} onClick ={() => setPage(page-1)} className="button"> ◀ </button>
          <form onSubmit={handleSubmit}><input className="indicator" onChange={handleChange}value={inputPage}/></form>
        <button style={button.next} onClick ={() => setPage(page+1)}className="button"> ▶ </button>
      </div>
    );
  }

  //hook for progressBar
  const [progress, setProgress] = useState(page/size);
  useEffect(() => {
    setProgress(page/size);
  },[page, size]);
  //component for progress bar
  const ProgressBar = () => {
    const styleProgress ={
      width: `calc(${progress}*100%)`,
      borderBottom: '0.25rem solid lightgreen'
    }
    return(<div style={styleProgress}></div>);
  }

  //component for Nav  
  const Navbar = () => {
    return(
      <header className="App-header"></header>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <ProgressBar />
      <Reader />
    </div>
  );
}

export default App;
