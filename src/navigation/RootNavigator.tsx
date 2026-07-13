import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext";
import { DetailScreen } from "../screens/DetailScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { colors } from "../theme";
import { AppStackParamList, RootStackParamList, TabParamList } from "../types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

export function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function AppNavigator() {
  return (
    <WishlistProvider>
      <AppStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "900" },
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <AppStack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <AppStack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detail Produk" }}
        />
      </AppStack.Navigator>
    </WishlistProvider>
  );
}

function TabsNavigator() {
  const tabBarIcon = useMemo(
    () =>
      ({
        route,
        color,
        size
      }: {
        route: { name: keyof TabParamList };
        color: string;
        size: number;
      }) => {
        const icons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
          Home: "home-outline",
          Wishlist: "heart-outline",
          Profile: "person-circle-outline"
        };

        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    []
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontWeight: "900" },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          minHeight: 66,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontWeight: "800"
        },
        tabBarIcon: ({ color, size }) => tabBarIcon({ route, color, size })
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: "Wishlist" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
    </Tab.Navigator>
  );
}
