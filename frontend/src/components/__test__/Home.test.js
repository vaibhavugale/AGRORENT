import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import { Provider } from "react-redux";
import store from "../../store/store";
import { render } from '@testing-library/react';



// Mock the Swiper component
jest.mock('swiper/swiper-react.mjs', () => ({
    Swiper: jest.fn().mockImplementation(() => <div data-testid="swiper" />),
    SwiperSlide: jest.fn().mockImplementation(() => <div data-testid="swiper-slide" />)
  }));


test('should load home page', () => { 
   const getByTestId =  render(
        <BrowserRouter>
            <Provider store={store}>
                     <Home/>
            </Provider>
        </BrowserRouter>
     )

    expect(r).toBe(2);
 })