import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//SCSS Styling
import style from './StepOne.module.scss';

export default function StepOne(props) {

    const { customerOptions, nextOrderId, completeFormStep, setFormData, customerType, setCustomerType, setOpenPopup, data } = props;

    const today = new Date();
    const dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`) + 'T' + (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ':' + (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`);

    today.setDate(today.getDate() + 3);
    const deliveryDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);


    const { formState: { isValid, errors }, control, setValue, getValues, reset, trigger } = useForm({
        mode: "onChange",
        defaultValues: {
            customertype: '',
            orderno: `${JSON.parse(sessionStorage.getItem("Auth")).employeeid}${nextOrderId}`,
            orderplacedat: dateTime,
            deliverydate: deliveryDate,
            salesrepresentative: `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`,
            customer: '',
            storename: '',
            customerid: '',
            shippingaddress: '',
            contactnumber: '',
            route: '',
        }
    });

    const handleCustomerTypeChange = (event, option) => {
        setValue("customertype", option.props.value);
        setCustomerType(option.props.value);
    }

    const handleCustomerChange = (event, option) => {
        if (option) {
            setValue("customer", option.title);
            setValue("customerid", option.id);
            setValue("storename", option.storename);
            setValue("shippingaddress", option.shippingaddress);
            setValue("route", option.route);
            setValue("contactnumber", option.contactnumber);
        }
    }

    const onSubmit = () => {

        trigger();

        // console.log("ERRORS :", errors);
        // console.log("VALIDATION :", isValid);
        // console.log("VALUES: ", getValues());

        if (isValid) {
            setFormData(getValues());
            completeFormStep();
        }
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Customer and Order Details
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 4
                </div>

            </div>

            <div className={style.body}>

                <div className={style.row}>
                    <div className={style.label}>
                        Order No. <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"orderno"}
                            control={control}
                            rules={{ required: { value: true, message: "Order No. is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    error={errors.orderno ? true : false}
                                    helperText={errors.orderno && errors.orderno.message}
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: ON00006211126001"
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Order placed at <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"orderplacedat"}
                            control={control}
                            rules={{ required: { value: true, message: "Order placed at is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.orderplacedat ? true : false}
                                    helperText={errors.orderplacedat && errors.orderplacedat.message}
                                    margin="dense"
                                    type="datetime-local"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Delivery Date <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"deliverydate"}
                            control={control}
                            rules={{ required: { value: true, message: "Delivery date is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.deliverydate ? true : false}
                                    helperText={errors.deliverydate && errors.deliverydate.message}
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Sales Representative <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"salesrepresentative"}
                            control={control}
                            rules={{ required: true, message: "Sales Representative is required" }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    value={value || ''}
                                    error={errors.salesrepresentative ? true : false}
                                    helperText={errors.salesrepresentative && errors.salesrepresentative.message}
                                    onChange={onChange}
                                    placeholder="Ex: Buddhika Bandara (E00006)"
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Customer Type <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"customertype"}
                            control={control}
                            rules={{ required: { value: true, message: "Customer type is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value || ''}
                                    onChange={(e, option) => {
                                        onChange(e, option)
                                        handleCustomerTypeChange(e, option)
                                    }}
                                    options={employeeservice.getCustomerTypeOptions()}
                                    error={errors.customertype ? true : false}
                                    helperText={errors.customertype && errors.customertype.message}
                                    size="small"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Customer <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        {customerType === "Registered Customer" ?
                            <Controller
                                name={"customer"}
                                control={control}
                                rules={{ required: "Customer is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        options={customerOptions || []}
                                        fullWidth
                                        getOptionLabel={(option) => option.title}
                                        onChange={(e, option) => {
                                            onChange(e, option)
                                            handleCustomerChange(e, option)
                                        }}
                                        inputValue={value || ""}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                helperText={errors.customer && errors.customer.message}
                                                error={errors.customer ? true : false}
                                                variant="outlined"
                                                margin="dense"
                                                placeholder="Ex: C000001 - Champika Super Center and Pharmacy"
                                            />
                                        )}
                                    />
                                )}
                            />
                            :
                            <Controller
                                name={"customer"}
                                control={control}
                                rules={{ required: "Customer is required" }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        value={value || ''}
                                        onChange={onChange}
                                        error={errors.customer ? true : false}
                                        helperText={errors.customer && errors.customer.message}
                                        placeholder="Ex: Champika Super Center and Pharmacy"
                                        margin="dense"
                                    />
                                )}
                            />

                        }
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Shipping  Address <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"shippingaddress"}
                            control={control}
                            rules={{ required: "Shipping address is required" }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.shippingaddress ? true : false}
                                    helperText={errors.shippingaddress && errors.shippingaddress.message}
                                    placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Contact No. <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"contactnumber"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Contact number is required" },
                                pattern: { value: /^[0-9]{10}$/, message: "Contact number is invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.contactnumber ? true : false}
                                    helperText={errors.contactnumber && errors.contactnumber.message}
                                    placeholder="Ex: 0352264589"
                                    margin="dense"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Route <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        <Controller
                            name={"route"}
                            control={control}
                            rules={{ required: { value: true, message: "Route is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value || ''}
                                    onChange={onChange}
                                    options={employeeservice.getRouteOptions()}
                                    error={errors.route ? true : false}
                                    helperText={errors.route && errors.route.message}
                                    size="small"
                                />
                            )}
                        />
                    </div>
                </div>

            </div>


            <div className={style.footer}>

                <div className={style.resetBtn}>
                    <Button
                        disabled={data.length > 0}
                        variant="contained"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                </div>

                <div className={style.nextBtn}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}