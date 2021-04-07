import consumer from './consumer';

const GameSessionChannel = (game_id) =>
  consumer.subscriptions.create(
    { channel: 'GameSessionChannel', game_id },
    {
      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
      },
    }
  );

export default GameSessionChannel;
