import React from "react";
// import { StackNavigator } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import User from "./screens/User";
import Favorites from "./screens/Favorites";
import Options from "./screens/Options";

import colors from "./utils/colors";
import store from "./store";

const getTabBarIcon = (icon) => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const getDrawerItemIcon = (icon) => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ContactsScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen
        name="Contacts"
        options={({ navigation: { navigate } }) => ({
          title: "Contacts",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={24}
              style={{ color: colors.black, marginLeft: 10 }}
              onPress={() => navigate("DrawerToggle")}
            />
          ),
        })}
        component={Contacts}
      />

      <Stack.Screen
        options={({ route: { params } }) => {
          const { id } = params;
          const { name } = store
            .getState()
            .contacts.find((contact) => contact.id === id);
          return {
            title: name.split(" ")[0],
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: colors.blue,
            },
          };
        }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        options={({ navigation: { navigate } }) => ({
          title: "Favorites",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={24}
              style={{ color: colors.black, marginLeft: 10 }}
              onPress={() => navigate("DrawerToggle")}
            />
          ),
        })}
        component={Favorites}
      />

      <Stack.Screen
        options={({ route: { params } }) => {
          const { id } = params;
          const { name } = store
            .getState()
            .contacts.find((contact) => contact.id === id);
          return {
            title: name.split(" ")[0],
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: colors.blue,
            },
          };
        }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const UserScreen = () => {
  return (
    <Stack.Navigator initialRouteName="User" mode="modal">
      <Stack.Screen
        name="User"
        options={({ navigation: { navigate } }) => ({
          title: "Me",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={24}
              style={{ color: "white", marginLeft: 10 }}
              onPress={() => navigate("DrawerToggle")}
            />
          ),
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{ color: "white", marginRight: 10 }}
              onPress={() => navigate("Options")}
            />
          ),
        })}
        component={User}
      />

      <Stack.Screen
        name="Options"
        component={Options}
        options={({ navigation: { goBack } }) => ({
          title: "Options",
          headerLeft: () => (
            <MaterialIcons
              name="close"
              size={24}
              style={{ color: colors.black, marginLeft: 10 }}
              onPress={() => goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default class TabNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.blue,
          },
        }}
        initialRouteName="Contacts"
        tabBarPosition="bottom"
        tabBarOptions={{
          style: { backgroundColor: colors.greyLight },
          showLabel: false,
          showIcon: true,
          activeTintColor: colors.blue,
          inactiveTintColor: colors.greyDark,
          renderIndicator: () => null,
        }}
      >
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{ drawerIcon: getDrawerItemIcon("list") }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ drawerIcon: getDrawerItemIcon("star") }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerIcon: getDrawerItemIcon("person"),
          }}
        />
      </Drawer.Navigator>
    );
  }
}
