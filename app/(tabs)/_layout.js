import { Tabs} from 'expo-router'
import { MaterialIcons ,FontAwesome,Ionicons} from '@expo/vector-icons';

export default () =>{
    return (
        <Tabs>
            <Tabs.Screen name='menu' options={{
                headerShown : false,
                title:'FOOD',
                tabBarIcon:({color,size})=>
                <Ionicons name="fast-food-sharp" size={size} color={color} />
                }}/>
            <Tabs.Screen name='orders' options={{
                title:'ORDERS',
                headerShown : false,
                tabBarIcon:({color,size})=>
                <FontAwesome name="reorder" size={size} color={color} />
            }}/>
            <Tabs.Screen name='profile' options={{
                title:'PROFILE',
                tabBarIcon:({color,size})=>
                <MaterialIcons name="person-pin" size={size} color={color} />
            }}/>
        </Tabs>
    );
}