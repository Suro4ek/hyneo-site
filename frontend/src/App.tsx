import React from 'react';
import ToastProvider from "./components/Toast/ToastProvider";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

import {cartItems, darkTheme} from "./cache/cache";
import Pages from "./pages";

const uri = process.env.REACT_APP_API_URL;
const httpLink = createHttpLink({uri});

const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                cartItems:{
                    read() {
                        return cartItems();
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {},
    connectToDevTools: true
});


function App() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        if(localStorage.theme === 'white'){
            darkTheme(false);
        }else{
            darkTheme(true);
            document.documentElement.classList.add('dark')
        }
    } else {
        document.documentElement.classList.remove('dark')
    }


  return (
      <ApolloProvider client={client}>
          <ToastProvider variant="bottom_right">
              <Pages/>
          </ToastProvider>
      </ApolloProvider>
  );
}

export default App;
