/**
 * @author Freddy Michel <michelfreddy1992@gmail.com>
 * @description Homepage component
 */

import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';

import styles from './HomePage.module.css';

import TestService from '../../services/serviceApi';

import { useQuery } from 'react-query';

import { HomeComponent } from '../../components/HomeComponent';
import { NavbarLayout } from '../NavbarLayout';
import { DataInterface } from '../../utils/interface';

export type HomePageProps = {
}


const HomePage: React.FC<HomePageProps> = () => {
	
	const [searchInput, setSearchInput] = useState<string>("");
	
	const [getResult, setGetResult] = useState<DataInterface[] | any>(null);

	const [isSearch, setIsSearch] = useState<boolean>(false);

	const [numberPerPage, setNumberPerPage] = useState<any>(100);

	//Find all data
	
	const {isLoading, error, data} = useQuery('list', TestService.findAll);

	// Filter data by name

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
	});

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

	/**
	 * @author Freddy Michel <michelfreddy1992@gmail.com>
	 * @description start search app on change input search value 
	 * @param e 
	 */
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		setIsSearch(true);
		
	}

	/**
	 * @deprecated if all data is loading
	 */

	if(isLoading) {
		return (
			<div data-testid="data-loading" className={`container ${styles.HomePage}`}>
				<h2>Chargement...</h2>
			</div>
		)
	}

	/**
	 * @deprecated if fetch data is error
	 */

	if(error) {
		return(
			<div data-testid="data-error" className={`container ${styles.HomePage}`}>
				<h2>Erreur de chargement des données...</h2>
			</div>
		)
	}
	
	return (
		<Fragment>
			<NavbarLayout isSearchingItem={isSearchingItem} searchInput={searchInput} handleSearch={handleSearch} />
			<div className={`container ${styles.ContentPage}`}>
				<div className={styles.NavSearch}>

					{/* if isSearch and searchInput is not empty, show this section, else, show totals section */}
					{isSearch && searchInput !== "" ? (

						<p data-testid="data-number"  className={`${styles.NbrRes}`}>Résultats ({getResult && getResult.data.length ? getResult.data.length : 0})</p>
					
					):(
						<p data-testid="search-number"  className={`${styles.NbrRes}`}>Totals ({data && data.data.length ? data.data.length : 0})</p>
					)}

					{/* Input search */}
					<div className='d-flex w-50 justify-content-end'>
						<label className='mt-2' htmlFor="curent">Afficher par</label> &nbsp; &nbsp;
						<select name="" value={numberPerPage} onChange={(e)=> setNumberPerPage(e.target.value)} className='form-control input-sm w-auto' id="">
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
							<option value="300">300</option>
							<option value="400">400</option>
							<option value="500">500</option>
						</select>
					</div>
				</div>
				
				{/* When loading data on search */}
				{
					isSearchingItem && (
						<div className={`container ${styles.HomePage}`}>
							<h2>Chargement...</h2>
						</div>
					)
				}

				{/* If search is null or empty */}

				<div>
					{
						getResult && getResult.data.length === 0 && (
							<div className={`container ${styles.HomePage}`}>
								<h2>Aucun résultats</h2>
							</div>
						)
					}
				</div>
				
				{/* Call the component who the data is shwoing */}
				<HomeComponent numberPerPage={numberPerPage} data={isSearch && searchInput !== "" ? getResult && getResult.data : data?.data}/>
				
			</div>
		</Fragment>
	);
};

export default HomePage;
