// Tiny helper for the status-LED signature element.
// Usage: const led = new StatusLED(document.querySelector('#led'));
// led.idle() / led.live() / led.done()
class StatusLED {
  constructor(dotEl, labelEl) {
    this.dot = dotEl;
    this.label = labelEl;
    this.idle();
  }
  idle() {
    this.dot.dataset.state = 'idle';
    if (this.label) this.label.textContent = 'ready — local';
  }
  live() {
    this.dot.dataset.state = 'live';
    if (this.label) this.label.textContent = 'processing — local';
  }
  done() {
    this.dot.dataset.state = 'done';
    if (this.label) this.label.textContent = 'done — nothing left this device';
  }
}
