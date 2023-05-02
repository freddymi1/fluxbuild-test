import React, { Fragment, useState } from 'react';
import styles from './HomeComponent.module.css';
import { DataInterface } from '../../utils/interface';
import { Modal } from 'react-bootstrap';

import { AiFillEye } from 'react-icons/ai';
import { PaginationControl } from 'react-bootstrap-pagination-control';

export type HomeComponentProps = {
	data: DataInterface | any;
	numberPerPage: number,
}

const HomeComponent: React.FC<HomeComponentProps> = ({
	data,
	numberPerPage
}) => {

	//state for modal, open or note
	const [show, setShow] = useState<boolean>(false);

	// state for title of modal
	const [title, setTitle] = useState<string>("");

	// state for stocking data when open modal
	const [items, setItems] = useState<any[]>([]);

	const [currentPage, setCurrentPage] = useState<any>(1)
    

	/**
     * Pagination
     */
    const indexOfLastPage = currentPage * numberPerPage;
    const IndexOfFirstPage = indexOfLastPage - numberPerPage;
    const currentItems: any = data && data.slice(IndexOfFirstPage, indexOfLastPage);

	// close modal
	const handleClose = () => setShow(false);

	/**
	 * @author Freddy Michel <michelfreddy1992@gmail.com>
	 * @description open modal Detail page web
	 * @param data 
	 */

	const handleShow = (data: any, title: string) => {
        setShow(true);
		setItems(data);
		setTitle(title);
    }

	console.log("TOTAL", data && data.length)

	return (
		<div className={styles.HomeComponent}>
			<div data-testid="list-wrapper" className="row">
				{
					currentItems && currentItems.map((item: any, index: number) => (
						<div key={index} data-testid={`item-${index}`} className="col-12 col-sm-12 col-md-12 col-lg-4  my-3 text-center">
							<div className={`card ${styles.Link}`}>
								
								<div className="card-header d-flex justify-content-between">
									<p className='font-weight-bold m-0 text-primary'><strong>{item.alpha_two_code}</strong></p>
									<p className='text-uppercase m-0'><strong>{item.country}</strong></p>
									
								</div>
								
								<div className="card-body">

									
									<p className='m-0 w-100 d-flex justify-content-start'>
										Domaines: {item.domains[0]}&nbsp;
										
										{
											item.domains.length > 1 && (
												<i onClick={() =>handleShow(item.domains, 'domaines')} className="btn btn-success btn-sm m-0">
													<AiFillEye/>
												</i>
											)

										}
										<br />
									</p>
									
									<p className='m-0 d-flex justify-content-start'>
										Web: {item.web_pages[0]} &nbsp;
										{item.web_pages.length > 1 &&  (
											<>
												 <i onClick={() =>handleShow(item.web_pages, 'page web')} className='btn btn-primary btn-sm m-0'>
												 	<AiFillEye/>
												 </i>
											</>
										)}
									
									</p>									
									
								</div>

								<div className="card-footer btn btn-primary">
									<p className='m-0'>{item.name}</p>
								</div>
								
							</div>
						</div>
					))
				}
			</div>

			<Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>Liste du {title} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
					{
						items && items.map((data: any) => (
							<Fragment  key={data}>
								<a href={title === 'page web' ? data : '#'} className='m-0'>
									{data}
								</a><br />
							</Fragment>
						))

					}
                    </Modal.Body>
                    <Modal.Footer>
                        <button  type="button" onClick={handleClose} className="btn btn-danger">
                            Fermer
                        </button>
                    </Modal.Footer>
                </div>
          	</Modal>
		  	<div className="card-footer mt-5">
				<PaginationControl
					page={currentPage}
					between={4}
					total={data && data.length}
					limit={numberPerPage}
					changePage={(page) => {
						setCurrentPage(page)
					}}
					ellipsis={1}
				/>
			</div>
		</div>
	);
};

export default HomeComponent;
