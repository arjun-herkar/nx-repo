import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@process-workflow/shared/ui';
import { mockProcesses } from './mock-data';

const DashboardContainer = styled.div`
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatsCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
`;

const StatsNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatsLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const ChartContainer = styled(Card)`
  padding: 25px;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const Chart = styled.div`
  height: 300px;
  background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%),
    linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
    linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: 500;
`;

const TableContainer = styled(Card)`
  overflow: hidden;
  padding: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  tbody tr:hover {
    background: #f8f9fa;
  }
`;

const StatusSpan = styled.span<{ status: string }>`
  font-weight: 600;
  color: ${({ status }) =>
    status === 'Active'
      ? '#28a745'
      : status === 'Pending'
      ? '#ffc107'
      : '#dc3545'};
`;

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <DashboardContainer>
      <DashboardGrid>
        <StatsCard>
          <StatsNumber>247</StatsNumber>
          <StatsLabel>Active Workflows</StatsLabel>
        </StatsCard>
        <StatsCard>
          <StatsNumber>1,429</StatsNumber>
          <StatsLabel>Total Processes</StatsLabel>
        </StatsCard>
        <StatsCard>
          <StatsNumber>89%</StatsNumber>
          <StatsLabel>Success Rate</StatsLabel>
        </StatsCard>
        <StatsCard>
          <StatsNumber>12</StatsNumber>
          <StatsLabel>Pending Reviews</StatsLabel>
        </StatsCard>
      </DashboardGrid>

      <ChartContainer>
        <ChartTitle>Workflow Performance</ChartTitle>
        <Chart>Chart visualization would appear here</Chart>
      </ChartContainer>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProcesses.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td><StatusSpan status={p.status}>{p.status}</StatusSpan></td>
                <td>{p.created}</td>
                <td>
                  <Button onClick={() => navigate(`/detail/${p.id.substring(1)}`)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </DashboardContainer>
  );
}

export default Dashboard;