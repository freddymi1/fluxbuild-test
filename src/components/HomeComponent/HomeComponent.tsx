import React from 'react';
import styles from './HomeComponent.module.css';
import { DataInterface } from '../../utils/interface';

export type HomeComponentProps = {
	data: DataInterface | any;
}

const HomeComponent: React.FC<HomeComponentProps> = ({
	data
}) => {

	/**
	 * @author Freddy Michel <michelfreddy1992@gmail.com>
	 * @description naviguer vers la detail du card s'il y en a
	 * @param link 
	 */

	const goToWebPage = (link: string) => {
		window.location.href = `${link}`;
	}

	return (
		<div className={styles.HomeComponent}>
			<div className="row">
				{
					data && data.data.map((item: any, index: number) => (
						<div key={index} className="col-12 col-sm-12 col-md-4  my-3 text-center">
							<div className={`card ${styles.Link}`}>
								
								<div className="card-header d-flex justify-content-between">
									<p className='font-weight-bold m-0 text-primary'><strong>{item.alpha_two_code}</strong></p>
									<p className='text-uppercase m-0'><strong>{item.country}</strong></p>
									
								</div>
								
								<div className="card-body">
									<p>{item.name}</p>
									<p>
										<span>Domaine:</span> 
										&nbsp;
										<span className='text-primary'>
										{
											item.domains.map((data: any) => (
												<strong className='ml-2' key={data}>
													{data}
												</strong>
											))

										}
										</span>
									</p>
									
									
								</div>

								<div onClick={() =>goToWebPage(item.web_pages[0])} className="card-footer btn btn-primary">
									{
										item.web_pages.map((data: any) => (
											<p className='m-0' key={data}>
												{data}
											</p>
										))

									}
								</div>
								
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default HomeComponent;
