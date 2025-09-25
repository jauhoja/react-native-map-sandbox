import {Navigation} from 'react-native-navigation';
import App from './components/App';
import Home from './components/Home';

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
          ],
        },
      },
    });
  });
};

Navigation.registerComponent('Map', () => App); // Placeholder, React Native template view
Navigation.registerComponent('Home', () => Home);

export default start;
