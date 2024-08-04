import {Stack} from "expo-router";
import { Provider } from "react-redux";
import store from "../../store";

export default function Layout(){
    return (
        <Provider store={store}>
        <Stack>
            <Stack.Screen name="login" options={{headerShown:false}}/>
            <Stack.Screen name="register" options={{headerShown:false}}/>
        </Stack>
        </Provider>
    )
}