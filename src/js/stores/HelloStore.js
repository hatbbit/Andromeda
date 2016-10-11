import alt from '../alt';
import HelloActions from '../actions/HelloActions';

class HelloStore {
  constructor() {
    this.bindListeners({
      updateText: HelloActions.updateText,
    });

    this.text = 'default value';
  }

  updateText(text) {
    this.text = text;
  }

}

module.exports = alt.createStore(HelloStore);
