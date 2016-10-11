import alt from '../alt';

class HelloActions {
  updateText(text) {
    return text;
  }
}

module.exports = alt.createActions(HelloActions);
