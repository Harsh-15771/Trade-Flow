import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WatchList from '../WatchList';
import axios from 'axios';
import GeneralContext from '../GeneralContext';
import { DoughnutChart } from '../DoughnutChart';

// Mock axios
jest.mock('axios');

// Mock DoughnutChart to prevent chart.js canvas errors in Jest
jest.mock('../DoughnutChart', () => ({
  DoughnutChart: () => <div data-testid="mock-doughnut"></div>
}));

describe('WatchList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders WatchList with mocked Finnhub data', async () => {
    // Setup mock response for axios
    axios.get.mockResolvedValue({
      data: { c: 150.0, dp: 1.5, d: 2.5 }
    });

    render(
      <GeneralContext.Provider value={{ openBuyWindow: jest.fn() }}>
        <WatchList />
      </GeneralContext.Provider>
    );
    
    // Check if the static initial symbols exist (e.g., AAPL)
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByTestId('mock-doughnut')).toBeInTheDocument();

    // Verify axios was called to fetch live prices
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
