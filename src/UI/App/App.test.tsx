import ReactDOM from 'react-dom';
import { App } from './App';

it('renders with out crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App />, div);
});
