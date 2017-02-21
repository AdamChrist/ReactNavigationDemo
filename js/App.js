/* @flow */
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, Text, View, BackAndroid, ToastAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Banner from './Banner';
import CustomTabs from './CustomTabs';
import Drawer from './Drawer';
import ModalStack from './ModalStack';
import StacksInTabs from './StacksInTabs';
import SimpleStack from './SimpleStack';
import SimpleTabs from './SimpleTabs';
import Location from './Location';

const ExampleRoutes = {
    SimpleStack: {
        name: 'Stack Example',
        description: 'A card stack',
        screen: SimpleStack,
    },
    SimpleTabs: {
        name: 'Tabs Example',
        description: 'Tabs following platform conventions',
        screen: SimpleTabs,
    },
    Drawer: {
        name: 'Drawer Example',
        description: 'Android-style drawer navigation',
        screen: Drawer,
    },
    CustomTabs: {
        name: 'Custom Tabs',
        description: 'Custom tabs with tab router',
        screen: CustomTabs,
    },
    ModalStack: {
        name: Platform.OS === 'ios' ? 'Modal Stack Example' : 'Stack with Dynamic Header',
        description: Platform.OS === 'ios' ? 'Stack navigation with modals' : 'Dynamically showing and hiding the header',
        screen: ModalStack,
    },
    StacksInTabs: {
        name: 'Stacks in Tabs',
        description: 'Nested stack navigation in tabs',
        screen: StacksInTabs,
    },
    LinkStack: {
        name: 'Link in Stack',
        description: 'Deep linking into a route in stack',
        screen: SimpleStack,
        path: 'people/Jordan',
    },
    LinkTabs: {
        name: 'Link to Settings Tab',
        description: 'Deep linking into a route in tab',
        screen: SimpleTabs,
        path: 'settings',
    },
    Location: {
        name: 'Link to Location',
        description: 'Location',
        screen: Location,
        path: '',
    },
};


class MainScreen extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);

    }

    handleBackAndroid() {
        if (Platform.OS === 'android') {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                // 最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
        return false;
    }

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
                <Banner />
                {Object.keys(ExampleRoutes).map((routeName: String) =>
                    <TouchableOpacity
                        key={routeName}
                        onPress={() => {
                            const { path, params, screen } = ExampleRoutes[routeName];
                            const { router } = screen;
                            const action = path && router.getActionForPathAndParams(path, params);
                            navigation.navigate(routeName, {}, action);
                        }}
                    >
                        <View style={styles.item}>
                            <Text style={styles.title}>{ExampleRoutes[routeName].name}</Text>
                            <Text style={styles.description}>{ExampleRoutes[routeName].description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }
}

const AppNavigator = StackNavigator({
    ...ExampleRoutes,
    Index: {
        screen: MainScreen,
    },
}, {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
});

export default () => <AppNavigator />;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    description: {
        fontSize: 13,
        color: '#999',
    },
});
