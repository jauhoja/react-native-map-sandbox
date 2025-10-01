import {Navigation} from 'react-native-navigation';
import App from './components/App';
import Home from './components/Home';
import Map from './components/Map';

const start = () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'BOTTOM_TABS_LAYOUT',
          children: [
            {
              stack: {
                id: 'MAP_TAB',
                children: [
                  {
                    component: {
                      id: 'MAP_SCREEN',
                      name: 'Map',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require('./icons/map.png'),
                  },
                },
              },
            },
            {
              stack: {
                id: 'HOME_TAB',
                children: [
                  {
                    component: {
                      id: 'HOME_SCREEN',
                      name: 'Home',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require('./icons/home.png'),
                  },
                },
              },
            },
            {
              stack: {
                id: 'SETTINGS_TAB',
                children: [
                  {
                    component: {
                      id: 'SETTINGS_SCREEN',
                      name: 'Settings',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: require('./icons/settings.png'),
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
};

Navigation.registerComponent('Map', () => Map); // Placeholder, React Native template view
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Settings', () => App);

export default start;
