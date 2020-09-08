import React, {Suspense, useEffect, useState} from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from "./store";
import DefaultLayout from "./containers/DefaultLayout";
import {initCart} from "./store/actions/cart.action";
import {Loading} from "./components/atoms";

function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getLocalStorage = async () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                await store.dispatch(initCart(JSON.parse(cart)));
            }
        };
        getLocalStorage();
        setLoading(false);
    }, []);

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
                { loading ? <Loading /> : <Route path="/" name="Home" component={DefaultLayout}/>  }
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
}

export default App;
