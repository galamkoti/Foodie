import {Stack} from 'expo-router';
import { Provider } from "react-redux";
import store from "../store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const StackLayout= () =>{
    return (
        <Provider store={store} >
        <QueryClientProvider client={client}>
        <Stack>
            <Stack.Screen name='(authentication)' options={{headerShown : false}}/>
            <Stack.Screen name='(tabs)' options={{headerShown : false}}/>
        </Stack>
        </QueryClientProvider>
        </Provider>
    );
}

export default StackLayout;