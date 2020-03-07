import * as React from "react";
import UserTag from "./Pages/UserTag";
import { Route, Switch, Redirect } from "react-router-dom";
import * as Styled from "./AppStyles";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Navbar";
import PostsList from "./Pages/UserTag/PostsList";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/async/fetchUser';

const App = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Styled.App>
      <Navbar />
      <Styled.AppContent>
        <Switch>
          <Route
            exact 
            path="/posts"
            component={() => <Redirect to="/taglist" />}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/posts/:tag" component={PostsList} />
          <Route path="/taglist" component={UserTag} />
          <Redirect from="/" to="/taglist" />
        </Switch>
      </Styled.AppContent>
    </Styled.App>
  );
};

export default App;
