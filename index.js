import {
  registerMicroApps,
  runAfterFirstMounted,
  start,
  initGlobalState,
  loadMicroApp,
} from 'qiankun';
import axios from 'axios';
import renderApp from './App';

// TODO Call back to root caller and retrieve the config
axios
  .get('/config.json')
  .then((res) => {
    console.log('[platform-root] Initializing application');
    // init({ config: res.data });
  })
  .catch((err) => {
    console.log('catch', err);
  });

renderApp({ loading: true });

const loader = (loading) => renderApp({ loading });

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

init({
  config: [
    {
      name: 'menu',
      entry: '//localhost:7100',
      container: '#menu',
    },
    {
      name: 'mf-subapp1',
      entry: '//localhost:7101',
      container: '#viewport',
      activeRule: '/mf-subapp1',
    },
    {
      name: 'mf-subapp2',
      entry: '//localhost:7102',
      container: '#viewport',
      activeRule: '/mf-subapp2',
    },
  ],
});
