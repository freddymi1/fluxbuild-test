/**
 * @author Freddy Michel <michelfreddy1992@gmail.com>
 * @description navbar component
 */

import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export type NavbarLayoutProps = {
}

const NavbarLayout: React.FC<NavbarLayoutProps> = () => {
	return (
		<Navbar bg="light" fixed='top' expand="lg" style={{height: "auto", padding: "1.5rem 0"}}>
			<Container className='d-flex'>
				<Navbar.Brand href="#">FLUXBUILD.IO</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarLayout;
