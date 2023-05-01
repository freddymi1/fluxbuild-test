import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from 'react';
import { HomePage } from '../pages/HomePage';
import { MockData } from '../_mock_/mockData';
import { DataInterface } from '../utils/interface';

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

const FaceData: DataInterface | any = jest.fn(() => { return Promise.resolve(MockData) })


export default wrapper;

describe("Homepage component", () => {

    
    it("Displays the loading whene the loading is on", () => {
        render(<HomePage />, { wrapper });
        expect(screen.getByTestId("data-loading"))?.toBeInTheDocument();
        expect(screen.getByText(/Chargement.../i)).toBeVisible();
    });
    
    it("Displays error if error in loading data", () => {
        const error = null;
        render(<HomePage />, { wrapper });
        if (error !== null) {
            expect(screen.getByTestId("data-error"))?.toBeInTheDocument();
            expect(screen.getByText(/Erreur lors de la chargement des données.../i)).toBeVisible();
        }
        
    });

});