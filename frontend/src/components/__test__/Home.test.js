import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import { Provider } from "react-redux";
import store from "../../store/store";
import { render ,screen} from '@testing-library/react';
import {toBeInTheDocument} from "@testing-library/jest-dom"

jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-testid">{children}</div>,
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}))
jest.mock('swiper/modules', () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
  Scrollbar: (props) => null,
  A11y: (props) => null,
}))
jest.mock('swiper', () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
  Scrollbar: (props) => null,
  A11y: (props) => null,
}))


test('should load home page', () => { 
render(
        <BrowserRouter>
            <Provider store={store}>
                     <Home/>
            </Provider>
        </BrowserRouter>
     )

    

    // expect(r).toBe(2);
 })