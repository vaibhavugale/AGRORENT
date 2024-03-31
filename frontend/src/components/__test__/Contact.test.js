import Contact from "../../pages/contact/Contact"
import { BrowserRouter } from "react-router-dom";
import store from "../../store/store";
import { Provider } from "react-redux";

test('should Render Contact', () => { 
    <BrowserRouter>
            <Provider store={store}>
                   <Contact/>  
            </Provider>
        </BrowserRouter>

 })