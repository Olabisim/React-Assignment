

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import useSWR from "swr";
import { Paginator } from 'primereact/paginator';


interface onPageEventInterface {
    first: number,
    rows: number,
    page: number,
    totalPages?: number
}

export const DataTableComponent = () => {
    
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [rowClick, setRowClick] = useState(true);
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetcher = (...args : [any]) => fetch(...args).then(res => res.json())
    const { data, isLoading } = useSWR(`https://api.artic.edu/api/v1/artworks?page=${currentPage}`, fetcher)

    
    useEffect(() => {
        setProducts(data?.data)
    }, [data]);

    const onPageChange = (event:onPageEventInterface) => {
        console.log('event')
        console.log(event)
        setCurrentPage(event.page + 1)
        setFirst(event.first);
        setRows(event.rows);
    };


    return (
        <>
            
            <div className="card">
                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                    <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                    <label htmlFor="input-rowclick">Row Click</label>
                </div>
                <DataTable rows={5} value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e:any) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {/* <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e:any) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}> */}
                {/* <DataTable value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}> */}
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="place_of_origin" header="Place of Origin"></Column>
                    <Column field="artist_display" header="Artist Display"></Column>
                    <Column field="inscriptions" header="Inscriptions"></Column>
                    <Column field="date_start" header="Date Start"></Column>
                    <Column field="date_end" header="Date End"></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={10506} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </div>
        </>
    )
}
