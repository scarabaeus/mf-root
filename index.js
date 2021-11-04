import {
  registerMicroApps,
  runAfterFirstMounted,
  start,
  initGlobalState,
  loadMicroApp,
} from 'qiankun';
import axios from 'axios';
import render from './render/ReactRender';

axios
  .get('/config.json')
  .then((res) => {
    console.log('[platform-root] Initializing application');
    init({ config: res.data });
  })
  .catch((err) => {
    console.log('catch', err);
  });

render({ loading: true });

const loader = (loading) => render({ loading });

// Retrieve menu app from configuration
const getMenuApp = (config) => config.find((app) => app.name === 'menu');

// Create child app list for registration
const getChildApps = (config) =>
  config.reduce((acc, app) => {
    if (app.name !== 'menu') {
      acc.push({ ...app, loader });
    }
    return acc;
  }, []);

const init = ({ config }) => {
  // TODO: [platform-root] Determine if we need any lifecycle events
  registerMicroApps(getChildApps(config), {
    beforeLoad: [
      (app) => {
        console.log(
          '[platform-root] beforeLoad - %c%s',
          'color: green;',
          app.name,
        );
      },
    ],
    beforeMount: [
      (app) => {
        console.log(
          '[platform-root] beforeMount - %c%s',
          'color: green;',
          app.name,
        );
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          '[platform-root] afterUnmount - %c%s',
          'color: green;',
          app.name,
        );
      },
    ],
  });

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'platform-root',
  });

  onGlobalStateChange((value, prev) =>
    console.log('[platform-root] onGlobalStateChange - ', value, prev),
  );

  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });

  loadMicroApp(getMenuApp(config));

  start();

  runAfterFirstMounted(() => {
    console.log('[platform-root] runAfterFirstMounted');
  });
};
