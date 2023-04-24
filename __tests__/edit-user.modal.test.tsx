import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditUserModal from '@/components/dashboard/edit-user.modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

describe('EditUserModal', () => {
  it('renders modal when isVisible prop is true', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditUserModal isVisible={true} onClose={() => {}} userId="1" />
      </QueryClientProvider>
    );

    const modalTitle = screen.getByText('Edit the user');
    const modalBody = screen.getByTestId('edit-user-modal-body');

    expect(modalTitle).toBeInTheDocument();
    expect(modalBody).toBeInTheDocument();
  });

  it('does not render modal when isVisible prop is false', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditUserModal isVisible={false} onClose={() => {}} userId="1" />
      </QueryClientProvider>
    );

    const modalTitle = screen.queryByText('Edit the user');
    const modalBody = screen.queryByTestId('edit-user-modal-body');

    expect(modalTitle).not.toBeInTheDocument();
    expect(modalBody).not.toBeInTheDocument();
  });
});
