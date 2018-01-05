import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import SignIn from '../containers/SignIn/SignIn';
import Account from '../containers/Account/Account';
import Marketplace from '../containers/Marketplace/Marketplace';
import Training from '../containers/Training/Training';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/account" exact component={Account} />
      <Route path="/signup" exact component={SignIn} />
      <Route path="/marketplace" exact component={Marketplace} />
      <Route path="/arena" exact component={Marketplace} />
      <Route path="/training" exact component={Training} />
    </Switch>
  );
};

export default Routes;
