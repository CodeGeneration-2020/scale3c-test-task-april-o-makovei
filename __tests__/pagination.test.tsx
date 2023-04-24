import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/pagination/pagination';

describe('Pagination component', () => {
  const onChangeMock = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<Pagination current={1} total={10} />);
    expect(getByText(/1 - 10 of 10/i)).toBeInTheDocument();
  });

  it('does not render when total is 0 or 1', () => {
    const { container } = render(<Pagination total={0} />);
    expect(container.firstChild).toBeNull();

    const { container: container2 } = render(<Pagination total={1} />);
    expect(container2.firstChild).toBeNull();
  });

  it('calls onChange when clicking previous button', () => {
    const { getByText } = render(
      <Pagination current={2} total={10} onChange={onChangeMock} />
    );
    fireEvent.click(getByText(/</));
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it('calls onChange when clicking next button', () => {
    const { getByText } = render(
      <Pagination current={2} total={10} nextPage={3} onChange={onChangeMock} />
    );
    fireEvent.click(getByText(/>/));
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    const { getByText } = render(<Pagination current={1} total={10} />);
    const prevButton = getByText(/</);
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const { getByText } = render(<Pagination current={10} total={10} />);
    const nextButton = getByText(/>/);
    expect(nextButton).toBeDisabled();
  });
});
