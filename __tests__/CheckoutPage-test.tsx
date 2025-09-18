import { render, screen } from '@testing-library/react-native';
import { SQLiteProvider } from 'expo-sqlite';
import Checkout from '@/(tabs)/checkout';

describe('<CheckOutScreen />', () => { // beginning of test suite

    test('Checkout Page Renders', () => { // single test
       
        render(<SQLiteProvider databaseName="app.db"><Checkout /></SQLiteProvider>);
        screen.findByText("My Cart"); // checking if title of page rendering

    });

    test('Empty Cart Messsage Renders', () => { 
       
        render(<SQLiteProvider databaseName="app.db"><Checkout /></SQLiteProvider>);
        screen.findByText("Your cart is empty"); // checking if message displays when cart is empty 

    });

    test('Remove From Cart Button Renders', () => { 
       
        render(<SQLiteProvider databaseName="app.db"><Checkout /></SQLiteProvider>);
        screen.findByDisplayValue("Remove from Cart"); // checking if remove from cart button appears when cart is not empty

    });

    test('Vehicles In My Cart Renders', () => { 
       
        render(<SQLiteProvider databaseName="app.db"><Checkout /></SQLiteProvider>);
        screen.findByLabelText("VehicleListInCart"); // checking if cars in my cart rendering

    });

   

})