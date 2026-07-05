import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyActionWindow from '../BuyActionWindow';
import GeneralContext from '../GeneralContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the context provider
const renderWithContext = (ui) => {
  return render(
    <BrowserRouter>
      <GeneralContext.Provider value={{ closeBuyWindow: jest.fn() }}>
        {ui}
      </GeneralContext.Provider>
    </BrowserRouter>
  );
};

describe('BuyActionWindow Component', () => {
  test('renders Buy Action Window successfully', () => {
    renderWithContext(<BuyActionWindow uid="AAPL" action="BUY" price={150.0} />);
    
    // Check if the component renders properly (Qty is rendered in a legend)
    expect(screen.getByText('Qty.')).toBeInTheDocument();
  });

  test('price input is disabled to prevent client-side tampering', () => {
    renderWithContext(<BuyActionWindow uid="AAPL" action="BUY" price={150.0} />);
    
    // The price input should be disabled based on our security fix
    const priceInput = screen.getAllByRole('spinbutton')[1]; // second input is price
    expect(priceInput).toBeDisabled();
    expect(priceInput).toHaveValue(150);
  });
});
