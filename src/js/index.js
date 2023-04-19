import { h, render } from 'preact';

// eslint-disable-next-line no-unused-vars
import style from '../css/styles.pcss';

import App from './components/App';

const node = document.getElementById('app');

render(<App />, node, node.lastChild);
