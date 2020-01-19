import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

class Users extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  render() {
    const { loading } = this.props;

    if (loading) return <Spinner />;

    return (
      <div style={userStyle}>
        {this.props.users.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
