import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Button } from '@process-workflow/shared/ui';
import { mockProcesses } from '@process-workflow/dashboard/feature-dashboard';

const DetailHeader = styled(Card)`
  margin-bottom: 20px;
`;

const DetailTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const DetailMeta = styled.div`
  color: #666;
  font-size: 14px;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
`;

const DetailMain = styled.div`
  line-height: 1.6;
  color: #555;

  h3,
  h4 {
    color: #333;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 25px;
  }

  ol,
  ul {
    margin-left: 20px;
    line-height: 1.8;
  }
`;

const DetailSidebar = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  align-self: start;
`;

const SidebarSection = styled.div`
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SidebarTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const SidebarItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const mockData = {
  stats: [
    { label: 'Total Instances', value: '1,247' },
    { label: 'Completed', value: '1,105' },
    { label: 'In Progress', value: '128' },
    { label: 'Failed', value: '14' },
  ],
  performance: [
    { label: 'Avg. Duration', value: '2.3 days' },
    { label: 'Success Rate', value: '88.7%' },
    { label: 'SLA Compliance', value: '94.2%' },
  ],
};

export function DetailScreen() {
  const { processId } = useParams<{ processId: string }>();
  const process = mockProcesses.find((p) => p.id === `#${processId}`);

  if (!process) {
    return (
      <Card>
        <h2>Process not found</h2>
        <p>Could not find a process with ID: {processId}</p>
      </Card>
    );
  }

  return (
    <div>
      <DetailHeader>
        <DetailTitle>{process.name} Workflow</DetailTitle>
        <DetailMeta>
          Process ID: {process.id} • Created: {process.created} • Status:{' '}
          {process.status}
        </DetailMeta>
      </DetailHeader>

      <Card>
        <DetailGrid>
          <DetailMain>
            <h3>Process Overview</h3>
            <p>{process.description}</p>

            <h4>Process Steps</h4>
            <ol>
              <li>Customer Registration Form</li>
              <li>Identity Verification</li>
              <li>Document Upload</li>
              <li>Review and Approval</li>
              <li>Account Activation</li>
              <li>Welcome Email</li>
            </ol>
          </DetailMain>

          <DetailSidebar>
            <SidebarSection>
              <SidebarTitle>Process Statistics</SidebarTitle>
              {mockData.stats.map((item) => (
                <SidebarItem key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </SidebarItem>
              ))}
            </SidebarSection>
            <SidebarSection>
              <SidebarTitle>Actions</SidebarTitle>
              <Button
                variant="primary"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                Edit Workflow
              </Button>
              <Button style={{ width: '100%' }}>View Analytics</Button>
            </SidebarSection>
          </DetailSidebar>
        </DetailGrid>
      </Card>
    </div>
  );
}

export default DetailScreen;
