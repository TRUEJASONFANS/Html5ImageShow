require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Toolbar from './Toolbar';

class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      dirty: false
    }
    this.loadingImage = this.loadingImage.bind(this);
  }

  componentDidMount() {
    this.loadingImage();
    this.dirty = false;
  }

  componentWillUpdate() {
    console.log("xxx update");
  }

  loadingImage() {

    var image = new Image();
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    var dirtyfunc = () => { this.setState({ dirty: true }) };

    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    }
    image.src = 'http://localhost:8080/f.jpg';
    var zoomDelta = 0.1;
    var currentScale = 1;

    canvas.addEventListener('mousewheel', function (e) {
      ctx.save();
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      var width = image.width;
      var height = image.height;
      console.log("delta: " + delta);
      // var scale = 2;
      currentScale += delta * zoomDelta;
      ctx.clearRect(0, 0, width, height);
      // ctx.translate(-((newWidth - width) / 2), -((newHeight - height) / 2));
      console.log("current scale size:"+ currentScale);
      ctx.scale(currentScale, currentScale);
      ctx.drawImage(image, 0, 0);
      ctx.restore();
    }, false);

  }

  render() {
    return (
      <div className="index">
        <Toolbar />
        <canvas ref="canvas" width={550} height={820} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
