import { History } from 'history';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';

import Routes from '../Routes';
import { Store } from '../store';
import connectDb from '../database/typeorm.connection';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  useEffect(() => {
    // Initialize Typeorm Connection
    (async () => {
      await connectDb(2);
    })();
  }, []);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
