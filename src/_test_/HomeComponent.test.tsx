import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from 'react';
import { MockData } from '../_mock_/mockData';
import { HomeComponent } from '../components/HomeComponent';
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

export default wrapper;

const FakeData: DataInterface | any = jest.fn(() => { return Promise.resolve(MockData) });


describe("HomeComponent render", () => {
    
    it("should render university list", () => {
        FakeData.mockImplementation(() => ({
          data:  MockData
        }));
        render(<HomeComponent numberPerPage={10} data={MockData} />, { wrapper });
        expect(screen.getByTestId("list-wrapper"))?.toBeInTheDocument();
        expect(screen.getByTestId("item-1")).toBeInTheDocument();
    });
});