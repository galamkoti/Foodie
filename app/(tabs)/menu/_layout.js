import {Stack} from 'expo-router'

const MenuLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle : 'FOOD'}}/>
        </Stack>
    );
}
export default MenuLayout;