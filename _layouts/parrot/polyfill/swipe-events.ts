
if (!self.window.hasOwnProperty('swipeEventsPolyfill')) {

const SWIPE_TRESHOLD = 120;

let originX : number | null;

self.window.addEventListener('mousedown', e => {
  originX = e.pageX;
});
self.window.addEventListener('mousemove', e => {
  if (originX === null) {
    return;
  }

  const diff = e.pageX - originX;
  if (diff > SWIPE_TRESHOLD) {
    document.body.dispatchEvent(new Event('swipe-right'));
    originX += SWIPE_TRESHOLD;
  } else if (diff < -SWIPE_TRESHOLD) {
    document.body.dispatchEvent(new Event('swipe-left'));
    originX -= SWIPE_TRESHOLD;
  }
});

self.window.addEventListener('mouseup', e => {
  originX = null;
});

Object.defineProperty(self.window, 'swipeEventsPolyfill', {
  value: true,
});

}

