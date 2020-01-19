import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';

const myAxios = axios.create({
  params: {
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    client_secret:
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
  }
});

export default class App extends Component {
  state = {
    loading: false,
    users: []
  };

  async componentDidMount() {
    this.toggleLoading(true);
    const users = await myAxios.get(
      'https://api.github.com/users'
    );
    this.updateUsers(users.data);
    this.toggleLoading(false);
  }

  updateUsers(users) {
    this.setState({ users });
  }

  toggleLoading(bool) {
    this.setState({ loading: bool });
  }

  async searchUsers(text) {
    this.toggleLoading(true);
    const users = await myAxios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.updateUsers(users.data.items);
    this.toggleLoading(false);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Search
          searchUsers={this.searchUsers.bind(this)}
        />
        <div className="container">
          <Users
            loading={this.state.loading}
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}
