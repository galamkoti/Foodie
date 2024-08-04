import {Stack} from 'expo-router'


const OrdersLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='toptabs' options={{headerShown:false}}/>
        </Stack>
    );
}
export default OrdersLayout;