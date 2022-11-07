/*
 * forgerock-sample-web-react
 *
 * router.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './views/home';
import Logout from './views/logout';
import Register from './views/register';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * @function App - Application React view
 * @returns {Object} - React component object
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Home />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
