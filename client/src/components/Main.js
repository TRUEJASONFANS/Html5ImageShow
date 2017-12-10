require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';


class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.loadingImage();
  }

  loadingImage() {
    var myimage = new Image();
    const ctx = this.refs.canvas.getContext('2d');
    myimage.onload = function () {
      console.log(ctx);
      ctx.drawImage(myimage, 0, 0);
    }
    myimage.src = 'http://localhost:8080/f.jpg';
    this.setState({ loading: true });
  }

  render() {
    this.loadingImage = this.loadingImage.bind(this);
    return (
      <div className="index">
        <canvas ref="canvas" width={800} height={600}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
