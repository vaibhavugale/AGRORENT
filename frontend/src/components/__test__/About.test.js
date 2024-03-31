import About from "../../pages/about/About"
import { BrowserRouter } from "react-router-dom";
import store from "../../store/store";
import { Provider } from "react-redux";

test('should Render About', () => { 
    <BrowserRouter>
            <Provider store={store}>
                   <About/>  
            </Provider>
        </BrowserRouter>

 })