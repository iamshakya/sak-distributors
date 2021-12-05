import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';

//Material Table
import MaterialTable from 'material-table';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Styles
import style from './StepFour.module.scss';
import { makeStyles } from '@material-ui/core/styles';


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

export default function StepFour(props) {

    const { setOpenPopup, data, backFormStep, onSubmit } = props;

    const classes = useStyles();

    return (
        <div className={style.four}>
            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Confirm Items
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 4 of 4
                </div>

            </div>

            <div className={style.body}>
                <MaterialTable
                    components={{
                        Container: props => <Paper {...props} elevation={1} />,
                        Pagination: () => (
                            <td style={{
                                display: "flex",
                                flexDirection: "column"
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 0px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        ),
                        Header: props => (
                            <TableHead {...props} >
                                <TableRow className={classes.row1}>
                                    <TableCell width="34%" padding="none" rowSpan={2}>
                                        <div style={{ padding: '0 10px' }}>
                                            Description
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Retail Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Sales Qty.
                                    </TableCell>
                                    <TableCell padding="none" colSpan={2} align="center">
                                        Free Qty.
                                    </TableCell>
                                    <TableCell padding="none" colspan={2} align="center">
                                        Return Qty.
                                    </TableCell>
                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Price
                                        </div>
                                    </TableCell>
                                    <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                        <div style={{ padding: '0 10px' }}>
                                            Gross Amount
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.row2}>
                                    <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                    <TableCell width="6%" padding="none" align="center">D</TableCell>
                                    <TableCell width="6%" padding="none" align="center">R</TableCell>
                                </TableRow>
                            </TableHead>
                        ),
                    }}
                    columns={[
                        {
                            title: "Description",
                            field: "description",
                            cellStyle: {
                                padding: "12px 5px 12px 7px",
                                width: '34%',
                                textAlign: 'left'
                            },
                        },
                        {
                            title: "Retail Price",
                            field: "retailprice",
                            cellStyle: {
                                width: '10%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Sales Cs",
                            field: "salesqtycases",
                            cellStyle: {
                                padding: "12px 5px 12px 7px",
                                width: '6%',
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Sales Pcs",
                            field: "salesqtypieces",
                            cellStyle: {
                                width: '6%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Free Cs",
                            field: "freeqtycases",
                            cellStyle: {
                                width: '6%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Free Pcs",
                            field: "freeqtypieces",
                            cellStyle: {
                                width: '6%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Damaged",
                            field: "damaged",
                            cellStyle: {
                                width: '6%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Return",
                            field: "return",
                            cellStyle: {
                                width: '6%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Price",
                            field: "price",
                            cellStyle: {
                                width: '10%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        },
                        {
                            title: "Gross Amount",
                            field: "grossamount",
                            cellStyle: {
                                width: '10%',
                                padding: "12px 5px 12px 7px",
                                textAlign: 'right'
                            },
                        }
                    ]}
                    data={data}
                    options={{
                        toolbar: false,
                        search: false,
                        filter: true,
                        maxBodyHeight: "calc(100vh - 240px)",
                        minBodyHeight: "calc(100vh - 240px)",
                        headerStyle: {
                            position: "sticky",
                            top: "0",
                        },
                        rowStyle: rowData => ({
                            fontSize: "0.8em",
                            backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                        })
                    }}
                />
            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
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

                <div className={style.submitBtn}>

                    <Button
                        onClick={() => onSubmit()}
                        color="primary"
                        variant="contained"
                    >
                        Confirm and Submit
                    </Button>

                </div>

            </div>
        </div>
    )
}