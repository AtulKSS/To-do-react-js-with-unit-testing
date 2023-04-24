import { render, fireEvent, waitFor, screen,  waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import TodoHistory from '../components/TodoHistory';


jest.mock('axios');

describe('Home component', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.delete.mockReset();
  });

  it('should render the table with data', async () => {
    const data = [
      { id: '1', text: 'Task 1' },
      { id: '2', text: 'Task 2' },
    ];
    axios.get.mockResolvedValue({ data });
    render(<TodoHistory />);
    await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should show delete confirmation modal when clicking delete button', async () => {
    const data = [
      { id: '1', text: 'Task 1' },
    ];
    axios.get.mockResolvedValue({ data });  
    render(<TodoHistory />);
    await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  });

  it('should not delete item when clicking no in delete confirmation modal', async () => {
    const data = [
    { text: 'items' },
      ];
    axios.get.mockResolvedValue({ data });
    axios.delete.mockResolvedValue({});
    render(<TodoHistory />);
    await waitFor(() => expect(screen.getByText('items')).toBeInTheDocument());
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    const yesButton = screen.getByRole('button', { name: 'No' });
    fireEvent.click(yesButton);
    await waitFor(() => expect(screen.queryByText('items')).toBeInTheDocument());
});


it('should delete item when clicking yes in delete confirmation modal', async () => {
  const data = [
  { text: 'items' },
    ];
  axios.get.mockResolvedValue({ data });
  axios.delete.mockResolvedValue({});
  render(<TodoHistory />);
  await waitFor(() => expect(screen.getByText('items')).toBeInTheDocument());
  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);
  expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  const yesButton = screen.getByRole('button', { name: 'Yes' });
  fireEvent.click(yesButton);

  // wait for item to be deleted and data to be refreshed
  //await waitFor(() => expect(screen.queryByText('items')).not.toBeInTheDocument(), { timeout: 3000 }); //Error 
  await waitForElementToBeRemoved(() => screen.queryByText('items'));

  expect(screen.queryByText('items')).not.toBeInTheDocument(); //tohavebeencalled, create mock fucntion for delete method
});
  
});
