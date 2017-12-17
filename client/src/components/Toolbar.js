import React from 'react';
const Toolbar = (props) => (
  <div className="MainPageToolBar">
    <button id="zoomin" onClick={props.zoomin}/>
    <button id="zoomout"onClick={props.zoomout}/>
  </div>
)
export default Toolbar;