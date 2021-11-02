import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import render from './render/ReactRender';

render({ loading: true });

const loader = loading => render({ loading });

registerMicroApps(
  [
    {
      name: 'mf-subapp2',
      entry: '//localhost:7102',
      container: '#subapp-viewport',
      loader,
      activeRule: '/mf-subapp2',
    },
    {
      name: 'mf-subapp1',
      entry: '//localhost:3001',
      container: '#subapp-viewport',
      loader,
      activeRule: '/mf-subapp1',
    },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - root]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

setDefaultMountApp('/mf-subapp1');

start();

runAfterFirstMounted(() => {
  console.log('[mf-root] first app mounted');
});
