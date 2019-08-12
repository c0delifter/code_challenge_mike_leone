import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomNavbar from './components/Navbar';
import BulletinList from './components/BulletinList';
import {Container} from 'reactstrap';

import {Provider} from 'react-redux';
import store from './store';
import PostModal from './components/PostModal';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CustomNavbar/>
        <Container>
          <PostModal/>
          <BulletinList/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
