
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { NavbarLayout } from '../pages/NavbarLayout'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import { DataInterface } from '../utils/interface';
import { MockData } from '../_mock_/mockData';

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
});

const wrapper = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default wrapper;

const fakeData: DataInterface | any = jest.fn(() => { return Promise.resolve(MockData) })

describe('Input value', () => {

    test("Render input serach in navbar", async () => {
       
        render(<NavbarLayout isSearchingItem={true} searchInput="" handleSearch  />, { wrapper });
        const input = screen.getByPlaceholderText(/Recherche.../i);
        expect(input).toBeInTheDocument();

    });

    test("callback function is called on user interactions", () => {
        render(<NavbarLayout isSearchingItem={true} searchInput="Rio" handleSearch  />, { wrapper });
        const input: any = screen.getByPlaceholderText(/Recherche.../i);
        const testValue = "Rio";
      
        fireEvent.change(input, { target: { value: testValue } });
        expect(input.value).toBe(testValue);
    });
})