/**
 * @author Freddy Michel <michelfreddy1992@gmail.com>
 * @description navbar component
 */

import React from 'react';
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';

export type NavbarLayoutProps = {
	isSearchingItem: boolean,
	searchInput: string,
	handleSearch: any
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({
	handleSearch,
	searchInput,
	isSearchingItem
}) => {

	return (
		<Navbar bg="light" fixed='top' expand="lg" style={{height: "auto", padding: "1.5rem 0"}}>
			<Container className='d-flex'>
				<Navbar.Brand href="#">FLUXBUILD.IO</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0"></Nav>
					<Form className="d-flex">
						<Form.Control
						data-testid="search-input"
						type="search"
						role='search'
						placeholder={`Rechercher...${isSearchingItem && 'Search...'}`}
						className="me-2"
						aria-label="Search"
						value={searchInput} 
						name='search'
						onChange={(e) => handleSearch(e)}
						/>
					</Form>
					
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarLayout;
