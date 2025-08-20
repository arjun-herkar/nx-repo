export interface Process {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Stopped';
  created: string;
  description: string;
}

export const mockProcesses: Process[] = [
  {
    id: '#WF001',
    name: 'Customer Onboarding',
    status: 'Active',
    created: '2025-01-15',
    description:
      'This workflow manages the complete customer onboarding process from initial registration through account activation. The process includes identity verification, document collection, and final account setup.',
  },
  { id: '#WF002', name: 'Invoice Processing', status: 'Pending', created: '2025-01-14', description: 'Automated processing of incoming invoices, from data extraction to payment approval.' },
  { id: '#WF003', name: 'Employee Training', status: 'Active', created: '2025-01-13', description: 'Manages the training lifecycle for new and existing employees, including course enrollment and completion tracking.' },
  { id: '#WF004', name: 'Product Review', status: 'Stopped', created: '2025-01-12', description: 'A workflow for internal review and approval of new product features before public release.' },
];