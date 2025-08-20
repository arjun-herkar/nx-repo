import * as React from 'react';

import NxWelcome from './nx-welcome';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppThemeProvider } from '@process-workflow/shared/theme';
import { store } from '@process-workflow/shared/state';
import { MainLayout } from '@process-workflow/shared/layout';
import { LoadingSpinner } from '@process-workflow/shared/ui';

const MfeDashboard = React.lazy(() => import('mfe-dashboard/Module'));
const MfeTemplates = React.lazy(() => import('mfe-templates/Module'));
const MfeWorkflow = React.lazy(() => import('mfe-workflow/Module'));
const MfeAdmin = React.lazy(() => import('mfe-admin/Module'));

export function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <MainLayout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<NxWelcome title="host" />} />
              <Route path="/mfe-dashboard" element={<MfeDashboard />} />
              <Route path="/mfe-templates" element={<MfeTemplates />} />
              <Route path="/mfe-workflow" element={<MfeWorkflow />} />
              <Route path="/mfe-admin" element={<MfeAdmin />} />
            </Routes>
          </React.Suspense>
        </MainLayout>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
