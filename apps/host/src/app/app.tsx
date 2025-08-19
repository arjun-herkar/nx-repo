import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const MfeDashboard = React.lazy(() => import('mfe-dashboard/Module'));

const MfeTemplates = React.lazy(() => import('mfe-templates/Module'));

const MfeWorkflow = React.lazy(() => import('mfe-workflow/Module'));

const MfeAdmin = React.lazy(() => import('mfe-admin/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/mfe-dashboard">MfeDashboard</Link>
        </li>

        <li>
          <Link to="/mfe-templates">MfeTemplates</Link>
        </li>

        <li>
          <Link to="/mfe-workflow">MfeWorkflow</Link>
        </li>

        <li>
          <Link to="/mfe-admin">MfeAdmin</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />

        <Route path="/mfe-dashboard" element={<MfeDashboard />} />

        <Route path="/mfe-templates" element={<MfeTemplates />} />

        <Route path="/mfe-workflow" element={<MfeWorkflow />} />

        <Route path="/mfe-admin" element={<MfeAdmin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
