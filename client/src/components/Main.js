require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Toolbar from './Toolbar';

class AppComponent extends React.Component {

  constructor() {
    super();
    this.loadingImage = this.loadingImage.bind(this);
  }

  componentDidMount() {
    this.loadingImage();
    this.trackTransforms();
  }

  trackTransforms() {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function () { return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function (radians) {
      xform = xform.rotate(radians * 180 / Math.PI);
      return rotate.call(ctx, radians);
    };

    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
      var m2 = svg.createSVGMatrix();
      m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
      pt.x = x; pt.y = y;
      return pt.matrixTransform(xform.inverse());
    }
  }

  loadingImage() {
    var image = new Image();
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    }
    image.src = 'http://localhost:8080/f.jpg';

    var lastX = canvas.width / 2, lastY = canvas.height / 2;
    var scaleFactor = 1.1;
    var redraw = this.redraw;

    canvas.addEventListener('mousemove', function (evt) {
      console.log("evt.pageX :" + evt.pageX + "evt.pageY" + evt.pageY);
      console.log("evt.offsetX :" + evt.offsetX + "evt.offsetY :" + evt.offsetY);
      lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
      lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    }, false);

    canvas.addEventListener('mousewheel', function (evt) {
      var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
      if (delta) {
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, delta);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw(image, ctx, canvas);
      };
      return evt.preventDefault() && false;
    }, false);

  }

  redraw(image, ctx, canvas) {
    // Clear the entire canvas
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.drawImage(image, 0, 0);
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
