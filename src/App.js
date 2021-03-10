import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import firebase from './firebase';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

function App(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // 로그인이 된 상태
      if (user) {
        history.push('/'); // 로그인 정보가 있으니 채팅페이지로
        dispatch(setUser(user));
      } else {
        history.push('/login');
      }
    });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
}

export default App;
