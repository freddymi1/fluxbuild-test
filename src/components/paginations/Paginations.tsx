import React from 'react'
interface Props {
    totalPages: any,
    paginate: any,
    postPerPage: any
}

export const Paginations: React.FC<Props> = ({totalPages, paginate, postPerPage}) =>{
    const numberPage = []

    for(let i = 1; i <= Math.ceil(totalPages/postPerPage);i++){
        numberPage.push(i)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination" style={{margin: "0px"}}>
                {
                    numberPage.map(page => (
                        <li key={page} className="page-item">
                            <p onClick={()=> paginate(page)} className="page-link" style={{margin: "0px"}}>
                                {page}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}