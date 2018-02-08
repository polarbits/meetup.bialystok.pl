import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from "./components/nav";
import "./App.css";
import Syncano from '@syncano/client'


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault(); 
    let s = new Syncano('red-snowflake-7218'); 
    s.post('user-auth/login', {username: 'maciek2@polarbits.co', password: 'maciek'}).then((res) => {
      console.log(res); 
      s.setToken(res.token);
      s.post('meetup/add', {title: this.state.title, description: this.state.description}).then((res) => {
        console.log(res);
      }) 
    })
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.name} onChange={this.handleInputChange} type="text" name="title" />
            <input value={this.state.surname} onChange={this.handleInputChange}  type="text" name="description" />
            <input type="submit" value="post" />
          </form>
        </div>
      </Router>
    );
  }
}

export default App;
