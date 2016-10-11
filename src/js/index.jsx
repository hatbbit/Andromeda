import React from 'react';
import { render } from 'react-dom';

import HelloContainer from './containers/HelloContainer';

render(
  <HelloContainer />,
  document.getElementById('content')
);
