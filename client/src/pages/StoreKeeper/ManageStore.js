import React, { useEffect, useState } from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

//Material UI 
import { Paper } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//Material Table
import MaterialTable, { MTableToolbar } from 'material-table';

//SCSS styles
import style from './ManageStore.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Axios
import axios from 'axios';

const useStyles = makeStyles({
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        },
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        },
    }
});

export default function ManageStore() {

    const classes = useStyles();

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/store/get-all-store-table-data")
            .then(res => {
                sessionStorage.setItem("StoreTableData", JSON.stringify(res.data));
                setData(res.data.tbody);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <Page title="Manage Store">
            <div className={style.container}>

                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={1} />,
                        Toolbar: (props) => (
                            <div
                                style={{
                                    height: "0px",
                                }}
                            >
                                <MTableToolbar {...props} />
                            </div>
                        ),
                        Header: props => (
                            <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 999 }}>
                                <TableRow className={classes.row1}>
                                    <TableCell width="2%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                        </div>
                                    </TableCell>
                                    <TableCell width="9%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Prod. ID
                                        </div>
                                    </TableCell>
                                    <TableCell width="30%" padding="none" rowSpan={2} align="left">
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            List / Selling Price (Rs.)
                                        </div>
                                    </TableCell>
                                    <TableCell width="15%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            GRN / GIN No.
                                        </div>
                                    </TableCell>
                                    <TableCell width="10%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Date
                                        </div>
                                    </TableCell>
                                    <TableCell width="5%" padding="none" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Pieces per Case
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Total Qty.
                                    </TableCell>
                                    {/* <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell> */}
                                    {/* <TableCell padding="none" colSpan={2} align="center">
                                        Return Qty.
                                    </TableCell> */}
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                    {/* <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell> */}
                                    {/* <TableCell width="6%" padding="none" align="center">R</TableCell> */}
                                    {/* <TableCell width="6%" padding="none" align="center">D</TableCell> */}
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            field: "productid",
                            render: rowData => {
                                return (
                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.productid}</p>
                                )
                            },
                            cellStyle: {
                                width: '9%',
                                textAlign: 'left'
                            }
                        },
                        //     const name = item.description;
                        {
                            field: "name",
                            cellStyle: {
                                width: '30%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "listorsellingprice",
                            // render: rowData => parseInt(rowData.listorsellingprice).toFixed(2),
                            cellStyle: {
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "grnnumberginnumber",
                            render: rowData => {
                                const grnnumberginnumber = rowData.grnnumberginnumber ? rowData.grnnumberginnumber.substring(0, 3) : '';

                                return (
                                    grnnumberginnumber === "GRN" ?
                                        <p style={{ padding: "0", margin: "0", color: "#1338BD", fontWeight: "700" }}>{rowData.grnnumberginnumber}</p> :
                                        <p style={{ padding: "0", margin: "0", color: "#FC6A03", fontWeight: "700" }}>{rowData.grnnumberginnumber}</p>
                                )
                            },
                            cellStyle: {
                                width: '15%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "date",
                            type: 'numeric',
                            cellStyle: {
                                width: '10%',
                                textAlign: 'left'
                            }
                        },
                        {
                            field: "piecespercase",
                            type: 'numeric',
                            cellStyle: {
                                width: '5%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "cases",
                            type: 'numeric',
                            cellStyle: {
                                width: '6%',
                                textAlign: 'right'
                            }
                        },
                        {
                            field: "pieces",
                            type: 'numeric',
                            cellStyle: {
                                width: '6%',
                                textAlign: 'right'
                            }
                        },
                        // {
                        //     field: "freeqtycases",
                        //     type: 'numeric',
                        //     cellStyle: {
                        //         width: '6%',
                        //         textAlign: 'right'
                        //     }
                        // },
                        // {
                        //     field: "freeqtypieces",
                        //     type: 'numeric',
                        //     cellStyle: {
                        //         width: '6%',
                        //         textAlign: 'right'
                        //     }
                        // },
                        // {
                        //     field: "returned",
                        //     type: 'numeric',
                        //     cellStyle: {
                        //         width: '6%',
                        //         padding: "10px 7px 10px 7px",
                        //         textAlign: 'right'
                        //     }
                        // },
                        // {
                        //     field: "damaged",
                        //     type: 'numeric',
                        //     cellStyle: {
                        //         width: '6%',
                        //         padding: "10px 7px 10px 7px",
                        //         textAlign: 'right'
                        //     }
                        // },
                    ]}
                    data={data}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parentid)}
                    options={{
                        addRowPosition: "first",
                        toolbar: false,
                        paging: false,
                        filtering: true,
                        search: false,
                        maxBodyHeight: "calc(100vh - 126px)",
                        minBodyHeight: "calc(100vh - 126px)",
                        actionsColumnIndex: -1,
                        headerStyle: {
                            position: "sticky",
                            top: "0",
                            backgroundColor: '#20369f',
                            color: '#FFF',
                            fontSize: "0.8em"
                        },
                        rowStyle: rowData => ({
                            fontSize: "0.8em",
                            backgroundColor: !!rowData.grnnumberginnumber ? '#ebebeb' : '#ffffff'
                        })
                    }}
                />

            </div>

        </Page>
    )
}
