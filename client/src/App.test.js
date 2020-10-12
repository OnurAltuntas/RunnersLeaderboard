import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import App from './App';

it('it displays default header items', () => {
  const { getByTestId } = render(<App />);
  const header = getByTestId('header');
  expect(header.children.length).toBe(3);  
});

it('it displays default background items', () => {
  const { getByTestId } = render(<App />);
  const background = getByTestId('background');
  expect(background.children.length).toBe(1);  
});

it('it displays default tableMenu items', () => {
  const { getByTestId } = render(<App />);
  const tableMenu = getByTestId('tableMenu');
  expect(tableMenu.children.length).toBe(2);  
});

it('it displays default mainReturn items', () => {
  const { getByTestId } = render(<App />);
  const mainReturn = getByTestId('mainReturn');
  expect(mainReturn.children.length).toBe(1);  
});

