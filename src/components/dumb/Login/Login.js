import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import LoginForm from './LoginForm';
import bgImage from '../../../assets/images/login-bg.jpg';

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class Login extends Component {
  render() {
    const { signIn, signInBySocial } = this.props;

    return (
      <Wrapper
        justify="center"
        alignItems="center"
        container
      >
        <LoginForm
          signIn={signIn}
          signInBySocial={signInBySocial}
        />
      </Wrapper>
    );
  }
}

export default Login;