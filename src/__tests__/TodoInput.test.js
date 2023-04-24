import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoInput from '../components/TodoInput';
import "@testing-library/jest-dom/extend-expect";

describe('TodoInput component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input field and add button', () => {
    const { getByPlaceholderText, getByRole } = render(<TodoInput />);
    expect(getByPlaceholderText('Enter your todo here')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  test('validation error message is displayed when input text is less than 3 characters', () => {
    render(<TodoInput />);
    const inputElement = screen.getByPlaceholderText("Enter your todo here");
    const buttonElement = screen.getByText("Add Task");
    fireEvent.change(inputElement, { target: { value: 'a' } });
    fireEvent.click(buttonElement);
    const errorMessage = screen.getByText(/Please Enter a valid To-Do/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validation error message is displayed when input text is empty', () => {
    const { getByRole, getByText } = render(<TodoInput />);
    fireEvent.click(getByRole('button', { name: 'Add Task' }));
    expect(getByText('Please Enter a valid To-Do')).toBeInTheDocument();
  });

//19
  test('should add a new task when the "Add Task" button is clicked', () => {
    const addList = jest.fn();
    const { getByRole, getByPlaceholderText } = render(<TodoInput addList={addList} />);
    const input = getByPlaceholderText('Enter your todo here');
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(getByRole('button', { name: 'Add Task' }));
    expect(addList).toHaveBeenCalledTimes(1);
    expect(addList).toHaveBeenCalledWith('New task');
  });

  it('input field should be cleared after clicking the "Add Task" button', () => {
    const addListMock = jest.fn();
    render(<TodoInput addList={addListMock} />);
    const inputBox = screen.getByPlaceholderText('Enter your todo here');
    const addButton = screen.getByText('Add Task');
    fireEvent.change(inputBox, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);
    expect(inputBox).toHaveValue('');
  });
});