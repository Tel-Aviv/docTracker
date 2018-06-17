import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './Main';

const App = () => {

    return (
            <Switch>
              <Route exact path='/:uid/:docid' component={Main} />
            </Switch>
          )

};

export default App;
