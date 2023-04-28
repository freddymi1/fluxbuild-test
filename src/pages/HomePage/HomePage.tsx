import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import TestService from '../../services/serviceApi';
import { useQuery } from 'react-query';

import { HomeComponent } from '../../components/HomeComponent';
import { NavbarLayout } from '../NavbarLayout';

export type HomePageProps = {
}

const HomePage: React.FC<HomePageProps> = () => {
	
	const [searchInput, setSearchInput] = useState<string>("");
	
	const [getResult, setGetResult] = useState<any>(null);

	const [isSearch, setIsSearch] = useState<boolean>(false);
	
	const {isLoading, data} = useQuery('list', TestService.findAll);

	const { isLoading: isSearchingItem, refetch: findListByName } = useQuery("search",
	() => {
		return TestService.searchByName(searchInput);
	},
	{
		enabled: false,
		retry: 1,
		onSuccess: (res: any) => {
			const result = {
				data: res.data,
			};

			setGetResult(result);
			
		},
		onError: (err: any) => {
			setGetResult(err.response?.data || err);
		},
	}
	);

	useEffect(() => {

		if (searchInput) {
			try {
				findListByName();
			} catch (err) {
				setGetResult(err);
			}
		}else{
			setGetResult(null);
		}
	}, [searchInput]);


	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		setIsSearch(true);
		
	}

	if(isLoading) {
		return (
			<div className={`container ${styles.HomePage}`}>
				<h2>Chargement...</h2>
			</div>
		)
	}
		
	
	return (
		<Fragment>
			<NavbarLayout/>
			<div className={`container ${styles.ContentPage}`}>
				<div className={styles.NavSearch}>
					{isSearch && searchInput !== "" ? (

						<p className={`${styles.NbrRes}`}>Résultats ({getResult && getResult.data.length ? getResult.data.length : 0})</p>
					
					):(
						<p className={`${styles.NbrRes}`}>Totals ({data && data.data.length ? data.data.length : 0})</p>
					)}
					<div className='d-flex'>
						<input type="text" placeholder={`${isSearchingItem ? 'Search...' : ''}`} className='form-control w-100' value={searchInput} onChange={(e) => handleSearch(e)} />
						{/* <button className='btn btn-light' onClick={(e: any)=>handleSearch(e)}>Search</button> */}
					</div>
				</div>

				

				{
					isSearchingItem && (
						<div className={`container ${styles.HomePage}`}>
							<h2>Chargement...</h2>
						</div>
					)
				}

				<div>
					{
						getResult && getResult.data.length === 0 && (
							<div className={`container ${styles.HomePage}`}>
								<h2>Aucun résultats</h2>
							</div>
						)
					}
				</div>

				<HomeComponent data={isSearch && searchInput !== "" ? getResult : data}/>
				
			</div>
		</Fragment>
	);
};

export default HomePage;
