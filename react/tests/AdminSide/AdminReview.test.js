import { getByTestId, queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Review from '../../components/Admin/Review/Review';

describe('Product Review Component', () => {
    render(<MemoryRouter><Review /></MemoryRouter>);

    test('fe_react_reviewProduct', () => {
        const customerId = screen.queryByTestId('customerId');

        expect(customerId).toBeTruthy();
    })
    
})