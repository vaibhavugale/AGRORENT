import Account from "../Account/Account"
import { BrowserRouter } from "react-router-dom";
import store from "../../store/store";
import { Provider } from "react-redux";

test('should Render Account', () => { 
    <BrowserRouter>
            <Provider store={store}>
                   <Account/>  
            </Provider>
        </BrowserRouter>

 })