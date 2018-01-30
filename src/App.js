import React, { Component } from 'react';

import indexCss from './index.css';

//modules
import cssStyles from './First.module.css';
//import layoutStyles from './components/Layout/Layout.css';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
