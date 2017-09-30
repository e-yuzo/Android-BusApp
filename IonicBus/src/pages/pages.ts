import { TabsPage } from './tabs/tabs';
import { SearchPage } from './search/search';
import { MapPage } from './home/home';
import { HomePage } from './home-page/home-page';
// The page the user lands on after opening the app and without a session
export const FirstRunPage = TabsPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = SearchPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = SearchPage;
export const Tab2Root = MapPage;
export const Tab3Root = HomePage;