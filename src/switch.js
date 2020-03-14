import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './home'

const mainNavigation = createSwitchNavigator({
  Home,
  
});

export default createAppContainer(mainNavigation);