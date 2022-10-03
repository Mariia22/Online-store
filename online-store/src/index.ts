import { StoreState } from './components/controller/state';
import './style.scss';
import { App } from './components/app/app';

const state = new StoreState();
const app = new App();
app.init(state).catch((error: Error) => {
  console.error(error.message);
  throw error;
});

window.onbeforeunload = () => {
  state.saveToLocalStorage();
};
