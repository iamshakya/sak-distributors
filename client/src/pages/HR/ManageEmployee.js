import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageEmployee.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Employee Form
import EmployeeForm from './EmployeeForm';
import ViewEmployee from './ViewEmployee';

//Connecting to Backend
import axios from 'axios';
// import ApproveSubmit from './ApproveSubmit';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageEmployee() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const [employeeRecords, setEmployeeRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextEmpId, setNextEmpId] = useState();
    const [reRender, setReRender] = useState(null);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/employees/get-all-employees-table-data")
            .then(res => {
                sessionStorage.setItem("EmployeesTableData", JSON.stringify(res.data));
                setHeadCells(res.data.thead);
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (employee, employeeid) => {
        for (let [key, value] of employee.entries()) {
            console.log(key, value);
        }
        if (action === "Create") {
            axios
                .post("http://localhost:8080/employees/create-employee", employee)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(employeeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;

        } if (action === "Edit") {
            axios
                .post(`http://localhost:8080/employees/update-by-id/${employeeid}`, employee)
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(employeeid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setEmployeeRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = employeeid => {
        axios
            .get(`http://localhost:8080/employees/${employeeid}`)
            .then(res => {
                setEmployeeRecords(res.data.employee);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextEmployeeId = () => {
        axios
            .get("http://localhost:8080/employees/get-next-regno")
            .then(res => {
                setNextEmpId(res.data.nextemployeeid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const { TableContainer, TableHead } = useTable(headCells);

    return (
        <Page title="Manage Employees">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
                            className={style.searchtextfield}
                            fullWidth={true}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getNextEmployeeId();
                                setOpenPopup(true);
                                setEmployeeRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>

                <div className={style.pagecontent}>
                    <TableContainer >
                        <TableHead />
                        <TableBody className={style.tablebody}>
                            {
                                records.map((row, i) => (
                                    <TableRow
                                        className={classnames(
                                            { [style.greytablerow]: i % 2 === 1 },
                                            { [style.whitetablerow]: i % 2 === 0 },
                                        )}
                                        key={row[0]}
                                    >
                                        {
                                            row.map((cell, i) => (
                                                <TableCell key={row[0] + cell}
                                                    className={classnames(
                                                        { [style.active]: cell === "Active" },
                                                        { [style.inactive]: cell === "Inactive" },
                                                        { [style.limitedAccess]: cell === "Limited Access" }
                                                    )}
                                                >
                                                    {cell}
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell
                                            align="center"
                                            className={style.actioncolumn}
                                        >
                                            <Tooltip title="View" arrow>
                                                <VisibilityIcon
                                                    className={style.visibilityIcon}
                                                    onClick={() => {
                                                        setAction('View');
                                                        openInPopup(row[0]);
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Edit" arrow>
                                                <EditIcon
                                                    className={style.editIcon}
                                                    onClick={() => {
                                                        setAction('Edit');
                                                        openInPopup(row[0]);
                                                    }}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </TableContainer>
                </div>
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    {action === 'View' ?
                        <ViewEmployee
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                        /> :
                        <EmployeeForm
                            addOrEdit={addOrEdit}
                            employeeRecords={employeeRecords}
                            setOpenPopup={setOpenPopup}
                            nextEmpId={nextEmpId}
                        />
                    }
                </PopUp>
                <Snackbar
                    open={open}
                    autoHideDuration={1500}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={type}
                        sx={{ width: '100%' }}
                    >
                        {alert}
                    </Alert>
                </Snackbar>
            </div>
        </Page>
    )
}
