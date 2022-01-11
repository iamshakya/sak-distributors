import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';
import formData from 'form-data';

//Material UI 
import {
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material Table
import MaterialTable from 'material-table';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';
import { makeStyles } from '@material-ui/core/styles';

//Form Step
import StepOne from './StepOne';

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

export default function CreatePurchaseOrder(props) {

    const classes = useStyles();

    const { productOptions, supplierOptions, addOrEdit, handleClosePopUp, poRecords } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});
    const [resetFormOpenPopup, setResetFormOpenPopup] = useState(false);

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const handleResetFormClosePopUp = () => {
        setResetFormOpenPopup(false)
    }

    const onSubmit = () => {

        const purchaseOrderFormData = new formData();

        if (confirmation === true && poRecords === null) {
            purchaseOrderFormData.append('ponumber', orderFormData.ponumber);
            purchaseOrderFormData.append('supplier', orderFormData.supplier);
            purchaseOrderFormData.append('customername', orderFormData.customername);
            purchaseOrderFormData.append('customeraddress', orderFormData.customeraddress);
            purchaseOrderFormData.append('contactnumber', orderFormData.contactnumber);
            purchaseOrderFormData.append('createdat', orderFormData.createdat);
            purchaseOrderFormData.append('createdby', orderFormData.createdby);
            purchaseOrderFormData.append('status', orderFormData.status);
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', orderFormData.grosstotal);
            purchaseOrderFormData.append('receiveddiscounts', orderFormData.receiveddiscounts);
            purchaseOrderFormData.append('damagedmissingitems', orderFormData.damagedmissingitems);
            purchaseOrderFormData.append('total', orderFormData.total);
        }

        if (confirmation === true && poRecords != null) {
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('approvedat', orderFormData.approvedat);
            purchaseOrderFormData.append('approvedby', orderFormData.approvedby);
            purchaseOrderFormData.append('status', orderFormData.status);
        }

        addOrEdit(purchaseOrderFormData, orderFormData.ponumber);
    }

    return (

        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        data={data}
                        setData={setData}
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        handleClosePopUp={handleClosePopUp}
                        resetFormOpenPopup={resetFormOpenPopup}
                        setResetFormOpenPopup={setResetFormOpenPopup}
                        handleResetFormClosePopUp={handleResetFormClosePopUp}
                        completeFormStep={completeFormStep}
                        supplierOptions={supplierOptions}
                        productOptions={productOptions}
                        poRecords={poRecords}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.two : style.hidden}>

                    <div className={style.header}>

                        <div className={style.title}>
                            <div>
                                {designation === "Distributor" ? "Approve & Edit Purchase Order" : (poRecords ? "Edit Purchase Order" : "Create Purchase Order")}
                            </div>
                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { handleClosePopUp() }}
                                />
                            </div>
                        </div>

                        <div className={style.step}>
                            Step 2 of 2
                        </div>

                    </div>


                    <div className={style.body}>

                        <div className={style.orderDetails}>

                            <table className={style.details}>
                                <tbody>
                                    <tr>
                                        <th align="left">Name</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.customername}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Address</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.customeraddress}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Contact No.</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.contactnumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    {poRecords &&
                                        <tr>
                                            <th align="left">Delivered at</th>
                                            <td align="left">
                                                {/* {dateTime} */}
                                                <Typography className={style.input}>
                                                    <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{poRecords.status}</p>
                                                </Typography>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                            <table className={style.details}>
                                <tbody>
                                    <tr>
                                        <th align="left">PO No.</th>
                                        <td align="left">
                                            {/* PO2110/004 */}
                                            <Typography className={style.input}>
                                                {orderFormData.ponumber}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Supplier</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.supplier}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="left">Created By</th>
                                        <td align="left">
                                            <Typography className={style.input}>
                                                {orderFormData.createdby} ({orderFormData.createdat})
                                            </Typography>
                                        </td>
                                    </tr>
                                    {poRecords &&
                                        <tr>
                                            <th align="left">Approved By</th>
                                            <td align="left">
                                                <Typography className={style.input}>
                                                    <p style={{ padding: "0", margin: "0", color: "#eed202", fontWeight: "700" }}>{poRecords.status}</p>
                                                </Typography>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                        </div>

                        <AutoSizer>
                            {({ height, width }) => {
                                const pageSize = Math.floor((height - 470) / 48);
                                return (
                                    <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                        <MaterialTable
                                            components={{
                                                Pagination: props => (
                                                    <td style={{
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }} >
                                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                            <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> Gross Total (Rs.) </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> {parseInt(orderFormData.grosstotal).toFixed(2)} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                            <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> Received Discounts (Rs.)</Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> {parseInt(orderFormData.receiveddiscounts).toFixed(2)} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                            <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items (Rs.) </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                                <Typography style={{ fontWeight: 600 }}> {parseInt(orderFormData.damagedmissingitems).toFixed(2)} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container style={{ background: "#f5f5f5", padding: 7 }}>
                                                            <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '200px' }}>
                                                                <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> Total (Rs.) </Typography>
                                                            </Grid>
                                                            <Grid item align="Right" style={{ margin: "0px 10px  0px 0px", width: '200px' }}>
                                                                <Typography style={{ fontSize: '1.05em', fontWeight: 600 }}> {parseInt(orderFormData.total).toFixed(2)} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <TablePagination {...props} />
                                                    </td>
                                                ),
                                                Header: props => (
                                                    <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                                        <TableRow className={classes.row1}>
                                                            <TableCell width="2%" padding="none" rowSpan={2} align="center">
                                                                <div style={{ padding: '0 10px' }}>
                                                                    #
                                                                </div>
                                                            </TableCell>
                                                            <TableCell width="32%" padding="none" rowSpan={2}>
                                                                <div style={{ padding: '0 10px' }}>
                                                                    Description
                                                                </div>
                                                            </TableCell>
                                                            <TableCell width="7%" padding="none" rowSpan={2} align="center">
                                                                <div style={{ padding: '0 10px' }}>
                                                                    Pieces per Case
                                                                </div>
                                                            </TableCell>
                                                            <TableCell width="7%" padding="none" rowSpan={2} align="center">
                                                                <div style={{ padding: '0 10px' }}>
                                                                    List Price
                                                                </div>
                                                            </TableCell>
                                                            <TableCell padding="none" colSpan={2} align="center">
                                                                Sales Qty.
                                                            </TableCell>
                                                            <TableCell padding="none" colSpan={2} align="center">
                                                                Free Qty.
                                                            </TableCell>
                                                            <TableCell padding="none" colSpan={2} align="center">
                                                                Return Qty.
                                                            </TableCell>
                                                            <TableCell padding="none" width="12%" rowSpan={2} align="center">
                                                                <div style={{ padding: '0 10px' }}>
                                                                    Value
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className={classes.row2}>
                                                            <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                            <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                            <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                            <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                            <TableCell width="6%" padding="none" align="center">D</TableCell>
                                                            <TableCell width="6%" padding="none" align="center">R</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                ),
                                            }}
                                            columns={[
                                                {
                                                    field: "tableData.id",
                                                    cellStyle: {
                                                        padding: "10px 5px 10px 7px",
                                                        width: '2%',
                                                        textAlign: 'left'
                                                    },
                                                },
                                                {
                                                    field: "description",
                                                    cellStyle: {
                                                        padding: "10px 5px 10px 7px",
                                                        width: '32%',
                                                        textAlign: 'left'
                                                    },
                                                },
                                                {
                                                    title: "Pieces Per Cases",
                                                    field: "piecespercase",
                                                    cellStyle: {
                                                        padding: "10px 5px 10px 7px",
                                                        width: '7%',
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "listprice",
                                                    type: 'numeric',
                                                    render: rowData => rowData.listprice.toFixed(2),
                                                    cellStyle: {
                                                        padding: "10px 5px 10px 7px",
                                                        width: '7%',
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "salesqtycases",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        padding: "10px 5px 10px 7px",
                                                        width: '7%',
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "salesqtypieces",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        width: '7%',
                                                        padding: "10px 5px 10px 7px",
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "freeqtycases",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        width: '7%',
                                                        padding: "10px 5px 10px 7px",
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "freeqtypieces",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        width: '7%',
                                                        padding: "10px 5px 10px 7px",
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "damaged",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        width: '6%',
                                                        padding: "10px 5px 10px 7px",
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "return",
                                                    type: 'numeric',
                                                    cellStyle: {
                                                        width: '6%',
                                                        padding: "10px 5px 10px 7px",
                                                        textAlign: 'right'
                                                    },
                                                },
                                                {
                                                    field: "value",
                                                    type: 'numeric',
                                                    render: rowData => rowData.value ? rowData.value.toFixed(2) : '',
                                                    cellStyle: {
                                                        width: '12%',
                                                        padding: "10px 15px 10px 12px",
                                                        textAlign: 'right'
                                                    },
                                                }
                                            ]}
                                            data={data}
                                            options={{
                                                pageSize: pageSize,
                                                pageSizeOptions: [],
                                                paging: true,
                                                toolbar: false,
                                                filtering: true,
                                                search: false,
                                                headerStyle: {
                                                    position: "sticky",
                                                    top: "0",
                                                    backgroundColor: '#20369f',
                                                    color: '#FFF',
                                                    fontSize: "0.8em"
                                                },
                                                rowStyle: rowData => ({
                                                    fontSize: "0.8em",
                                                    backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                                                })
                                            }}
                                        />

                                    </div>
                                );
                            }}
                        </AutoSizer>

                    </div>


                    <div className={style.footer}>

                        <div>
                            <Button
                                variant="contained"
                                onClick={backFormStep}
                                style={{
                                    backgroundColor: '#ACA9BB',
                                    color: 'white'
                                }}
                            >
                                Back
                            </Button>
                        </div>

                        <div className={style.nextBtn}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                {designation === 'Distributor' ? 'Approve and Submit' : 'Confirm and Submit'}
                            </Button>
                        </div>

                    </div>

                </section>

            }

        </form >

    );
}
