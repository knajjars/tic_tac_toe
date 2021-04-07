import { EventEmitter as EE } from 'events';
import toast from 'react-simple-toasts';

class EventEmitter extends EE {
  emit = (event, params) => {
    return super.emit(event, params);
  };
}

export const eventEmitter = new EventEmitter();

eventEmitter.on('analyzeWinner', ({ data, gameStats }) => {
  if (data.guest_wins > gameStats.guest_wins) {
    toast('Guest won', 5000);
  }
  if (data.host_wins > gameStats.host_wins) {
    toast('Host won', 5000);
  }
});
