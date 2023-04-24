import React from 'react';
import { render, fireEvent, getByRole, getByAltText, queryByRole, getAllByText, mockEditList, AddTaskForm } from '@testing-library/react';
import Todolist from '../components/TodoList';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";



describe('Todolist component', () => {
  
  const props = {
    mockItem : 'Test todo item',
    item: 'Test item',
    index: 0,
    editList: mockEditList,
    deleteItem: jest.fn(),
    mockEditList : jest.fn()
  };



  it('should render the item', () => {
    const { getByText } = render(<Todolist {...props} />);
    expect(getByText('Test item')).toBeInTheDocument(); //test by id use, varaible
  });

  it('should show delete confirmation when delete icon is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<Todolist {...props} />);
    expect(queryByTestId('delete-confirmation'))
    fireEvent.click(getByTestId('delete-icon'));
    expect(getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    fireEvent.click(getByText('No'));
    expect(queryByTestId('delete-confirmation'))
    fireEvent.click(getByTestId('delete-icon'));
    fireEvent.click(getByText('Yes'));
    expect(props.deleteItem).toHaveBeenCalledWith(props.index);
    expect(queryByTestId('delete-confirmation'))
  });

  it('should call deleteItem prop function when confirmation with Yes', () => {
    const { getByText, getByTestId } = render(<Todolist {...props} />);
    const deleteIcon = getByTestId('delete-icon');
    fireEvent.click(deleteIcon);
    const yesButton = getByText('Yes');
    fireEvent.click(yesButton);
    expect(props.deleteItem).toHaveBeenCalledWith(0);
  });

  it('should not call deleteItem prop function when confirmation is No', () => {
    const { getByText, getByTestId } = render(<Todolist {...props} />);
    const deleteIcon = getByTestId('delete-icon');
    fireEvent.click(deleteIcon);
    const noButton = getByText('No');
    fireEvent.click(noButton);
    expect(props.deleteItem).not.toHaveBeenCalled();
  });

  it('should show edit confirmation when edit icon is clicked', () => {
    const { getByText, getByTestId } = render(<Todolist {...props} />);
    const editIcon = getByTestId('edit-icon');
    fireEvent.click(editIcon);
    expect(getByText('Are you sure you want to edit this item?')).toBeInTheDocument();
  });

  // test('clicking on delete icon shows confirmation box', () => {
  //   const { getByTestId } = render(<Todolist {...props} />);
  //   fireEvent.click(getByTestId('delete-icon'));
  //   expect(getByTestId('delete-confirmation')).toBeInTheDocument();
  // });

  test('clicking on "No" in delete confirmation box hides the confirmation box', () => {
    const { getByTestId, queryByTestId } = render(<Todolist {...props} />);
    fireEvent.click(getByTestId('delete-icon'));
    fireEvent.click(getByTestId('delete-confirmation-no'));
    expect(queryByTestId('delete-confirmation')).not.toBeInTheDocument();
  });

  
  test('clicking on "No" in edit confirmation box hides the confirmation box', () => {
    const { getByTestId, queryByTestId } = render(<Todolist {...props} />);
    fireEvent.click(getByTestId('edit-icon'));
    fireEvent.click(getByTestId('edit-confirmation-no'));
    expect(queryByTestId('edit-confirmation')).not.toBeInTheDocument();
  });
  
  


  
});
