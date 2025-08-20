import * as React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppThemeProvider } from '@process-workflow/shared/theme';
import { store } from '@process-workflow/shared/state';
import { LoadingSpinner } from '@process-workflow/shared/ui';
import ProtectedRoute from './protected-route';
import { HomePage } from './home-page';

const Dashboard = React.lazy(
  () => import('@process-workflow/dashboard/feature-dashboard')
);
const Designer = React.lazy(
  () => import('@process-workflow/designer/feature-designer')
);
const DetailScreen = React.lazy(
  () => import('@process-workflow/detail/feature-detail')
);
const MfeTemplates = React.lazy(() => import('mfe-templates/Module'));
const MfeWorkflow = React.lazy(() => import('mfe-workflow/Module'));
const MfeAdmin = React.lazy(() => import('mfe-admin/Module'));
const LoginForm = React.lazy(() => import('@process-workflow/auth/feature-login'));

export function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginForm />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/mfe-dashboard" element={<Dashboard />} />
              <Route path="/designer" element={<Designer />} />
              <Route path="/detail/:processId" element={<DetailScreen />} />
              <Route path="/mfe-templates" element={<MfeTemplates />} />
              <Route path="/mfe-workflow" element={<MfeWorkflow />} />
              <Route path="/mfe-admin" element={<MfeAdmin />} />
            </Route>
          </Routes>
        </React.Suspense>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
