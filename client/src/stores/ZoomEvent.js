
class ZoomEvent {
  constructor(zoomDelta,lastX,lastY ) {
    this.zoomDelta = zoomDelta;
    this.lastX = lastX;
    this.lastY = lastY;
  }

  getX() {
    return this.lastX;
  }

  getY() {
    return this.lastY;
  }

  getZoomDelta() {
    return this.zoomDelta;
  }
}

export default ZoomEvent