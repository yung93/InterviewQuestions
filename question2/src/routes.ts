import {ElementType} from "react";
import Home from './views/Home';
import Cart from './views/Cart';
import Checkout from './views/Checkout';

interface IRoute {
    path: string,
    name: string,
    exact?: boolean,
    component: ElementType,
}

const routes: IRoute[] = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/cart', exact: true, name: 'Cart', component: Cart },
    { path: '/checkout/:transactionID', exact: true, name: 'Checkout', component: Checkout }
];

export default routes;