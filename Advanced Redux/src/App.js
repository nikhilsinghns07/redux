import { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {uiActions} from './store/ui-slice'

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const sendCartData = async() => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title : 'Sending',
          message : 'Sending cart data!',
        })
      )

      const response = await fetch('https://react-course-5686c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{  
        method : 'PUT',
        body : JSON.stringify(cart)
    })

    if(!response.ok) {
      throw new Error('Sending cart data')
    }

    dispatch(
      uiActions.showNotification({
        status: 'error',
        title : 'Error',
        message : 'Sending  Cart data Successfully',
      })
    )
  }

  sendCartData().catch(error => {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title : 'Error',
        message : 'Sending  Cart data Successfully',
      })
    )
  })

  },[cart,dispatch])


  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;