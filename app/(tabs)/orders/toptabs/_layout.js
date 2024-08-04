import { Tabs ,withLayoutContext} from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs=withLayoutContext(createMaterialTopTabNavigator().Navigator);
export default function OrderTopNaviation(){
    return (
    <SafeAreaView style={{flex:1 , backgroundColor :'white'}}>
        <TopTabs>
            {/* <TopTabs.Screen name="index" options={{title : 'ACTIVE ORDERS'}} /> */}
            <TopTabs.Screen name="history" options={{title : 'HISTORY OF ORDERS'}} />
        </TopTabs>
    </SafeAreaView>
    );
}