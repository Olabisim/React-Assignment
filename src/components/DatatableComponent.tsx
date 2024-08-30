

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import useSWR from "swr";

export const DataTableComponent = () => {
    
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState<any>();
    const [rowClick, setRowClick] = useState(true);

    const fetcher = (...args : [any]) => fetch(...args).then(res => res.json())
    const { data, isLoading } = useSWR(`https://api.artic.edu/api/v1/artworks?page=1`, fetcher)

    
    useEffect(() => {
        setProducts(data?.data)
    }, [data]);


    console.log('data')
    console.log(data)

    // title, place_of_origin, artist_display, inscriptions, date_start, date_end

    return (
        <>
            
            <div className="card">
                <div className="flex justify-content-center align-items-center mb-4 gap-2">
                    <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                    <label htmlFor="input-rowclick">Row Click</label>
                </div>
                <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e:any) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {/* <DataTable value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}> */}
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="place_of_origin" header="Place of Origin"></Column>
                    <Column field="artist_display" header="Artist Display"></Column>
                    <Column field="inscriptions" header="Inscriptions"></Column>
                    <Column field="date_start" header="Date Start"></Column>
                    <Column field="date_end" header="Date End"></Column>
                </DataTable>
                <div>

                </div>
            </div>
        </>
    )
}





// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { CustomerService } from './service/CustomerService';

// export default function PaginatorBasicDemo() {
//     const [customers, setCustomers] = useState([]);

//     useEffect(() => {
//         CustomerService.getCustomersMedium().then((data) => setCustomers(data));
//     }, []);

//     return (
//         <div className="card">
//             <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="name" header="Name" style={{ width: '25%' }}></Column>
//                 <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
//                 <Column field="company" header="Company" style={{ width: '25%' }}></Column>
//                 <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
//             </DataTable>
//         </div>
//     );
// }
        


// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { CustomerService } from './service/CustomerService';

// export default function LazyLoadDemo() {
//     const [loading, setLoading] = useState(false);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [customers, setCustomers] = useState(null);
//     const [selectAll, setSelectAll] = useState(false);
//     const [selectedCustomers, setSelectedCustomers] = useState(null);
//     const [lazyState, setlazyState] = useState({
//         first: 0,
//         rows: 10,
//         page: 1,
//         sortField: null,
//         sortOrder: null,
//         filters: {
//             name: { value: '', matchMode: 'contains' },
//             'country.name': { value: '', matchMode: 'contains' },
//             company: { value: '', matchMode: 'contains' },
//             'representative.name': { value: '', matchMode: 'contains' }
//         }
//     });

//     let networkTimeout = null;

//     useEffect(() => {
//         loadLazyData();
//     }, [lazyState]);

//     const loadLazyData = () => {
//         setLoading(true);

//         if (networkTimeout) {
//             clearTimeout(networkTimeout);
//         }

//         //imitate delay of a backend call
//         networkTimeout = setTimeout(() => {
//             CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
//                 setTotalRecords(data.totalRecords);
//                 setCustomers(data.customers);
//                 setLoading(false);
//             });
//         }, Math.random() * 1000 + 250);
//     };

//     const onPage = (event) => {
//         setlazyState(event);
//     };

//     const onSort = (event) => {
//         setlazyState(event);
//     };

//     const onFilter = (event) => {
//         event['first'] = 0;
//         setlazyState(event);
//     };

//     const onSelectionChange = (event) => {
//         const value = event.value;

//         setSelectedCustomers(value);
//         setSelectAll(value.length === totalRecords);
//     };

//     const onSelectAllChange = (event) => {
//         const selectAll = event.checked;

//         if (selectAll) {
//             CustomerService.getCustomers().then((data) => {
//                 setSelectAll(true);
//                 setSelectedCustomers(data.customers);
//             });
//         } else {
//             setSelectAll(false);
//             setSelectedCustomers([]);
//         }
//     };

//     const representativeBodyTemplate = (rowData) => {
//         return (
//             <div className="flex align-items-center gap-2">
//                 <img alt={rowData.representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`} width={32} />
//                 <span>{rowData.representative.name}</span>
//             </div>
//         );
//     };

//     const countryBodyTemplate = (rowData) => {
//         return (
//             <div className="flex align-items-center gap-2">
//                 <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
//                 <span>{rowData.country.name}</span>
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataTable value={customers} lazy filterDisplay="row" dataKey="id" paginator
//                     first={lazyState.first} rows={10} totalRecords={totalRecords} onPage={onPage}
//                     onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
//                     onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
//                     selection={selectedCustomers} onSelectionChange={onSelectionChange} selectAll={selectAll} onSelectAllChange={onSelectAllChange}>
//                 <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
//                 <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
//                 <Column field="country.name" sortable header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search" />
//                 <Column field="company" sortable filter header="Company" filterPlaceholder="Search" />
//                 <Column field="representative.name" header="Representative" body={representativeBodyTemplate} filter filterPlaceholder="Search" />
//             </DataTable>
//         </div>
//     );
// }
        