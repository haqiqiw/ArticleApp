import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ArticleScreen from './containers/article';
import BookScreen from './containers/book';
import DetailArticleScreen from './containers/detail-article';

const MainTab = createBottomTabNavigator(
  {
    Article: {
      screen: ArticleScreen,
    },
    Book: {
      screen: BookScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Article') {
          iconName = `ios-paper${focused ? '' : '-outline'}`;
        } else if (routeName === 'Book') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#324191',
      inactiveTintColor: 'gray',
    },
  }
);

export default createStackNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        header: null
      }
    }, 
    DetailArticle: {
      screen: DetailArticleScreen
    }
  },
  {
    initialRouteName: 'Main',
  }
);

