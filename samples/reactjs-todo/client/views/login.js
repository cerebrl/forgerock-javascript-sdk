/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { TokenManager, UserManager } from '@forgerock/javascript-sdk';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '../components/journey/alert';
import BackHome from '../components/utilities/back-home';
import Card from '../components/layout/card';
import { AppContext } from '../global-state';
import KeyIcon from '../components/icons/key-icon';
import Loading from '../components/utilities/loading';

/**
 * @function Login - React view for Login
 * @returns {Object} - React component object
 */
export default function Login() {
  const [state, methods] = useContext(AppContext);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = {
    code: searchParams.get('code'),
    state: searchParams.get('state'),
  };

  useEffect(() => {
    async function getTokens() {
      if (!state.isAuthenticated && !query.code) {
        await TokenManager.getTokens({ login: 'redirect' });
      } else if (query.code) {
        await TokenManager.getTokens({ query });
        const user = await UserManager.getCurrentUser();

        methods.setUser(user.name);
        methods.setEmail(user.email);
        methods.setAuthentication(true);

        navigate('/');
      } else {
        navigate('/');
      }
    }
    getTokens();

    // Only `state` and `query`are needed, all others are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, query]);

  if (!state.isAuthenticated) {
    return <Loading message="Checking your session ..." />;
  }
  return (
    <div className="cstm_container_v-centered container-fluid d-flex align-items-center">
      <div className="w-100">
        <BackHome />
        <Card>
          <div className="cstm_form-icon  align-self-center mb-3">
            <KeyIcon size="72px" />
          </div>
          <Alert message="Success! You're logged in." type="success" />
        </Card>
      </div>
    </div>
  );
}
