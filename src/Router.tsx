import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const PeoplePage = React.lazy(() => import('./pages/PeoplePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default Router;
