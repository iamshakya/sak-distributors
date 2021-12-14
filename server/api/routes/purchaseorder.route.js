const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model")
const PurchaseOrder = require("../models/purchaseorder.model");
const GRN = require("../models/grn.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /purchaseorders"
    });
});

//Get all table purchaseorder data
router.get("/get-all-purchaseorder-table-data", (req, res, next) => {

    PurchaseOrder
        .find()
        .exec()
        .then(doc => {

            const purchaseorder = doc.map(x => ({
                ponumber: x.ponumber,
                supplier: x.supplier,
                createdby: x.createdby,
                approvedby: x.approvedby,
                status: x.status,
            }))

            console.log("PURCHASE ORDER: ", purchaseorder);

            res.status(201).json({
                message: "Handeling GET requests to /get-all-purchaseorder-table-data",
                purchaseorder: purchaseorder,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})


//Create a purchaseorder
router.post("/create-purchaseorder", formDataBody.fields([]), (req, res, next) => {

    console.log("PURCHASE ORDER Body: ", req.body);
    const items = JSON.parse(req.body.items);

    const purchaseorder = new PurchaseOrder({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        customername: req.body.customername,
        customeraddress: req.body.customeraddress,
        contactnumber: req.body.contactnumber,
        supplier: req.body.supplier,
        createdat: req.body.createdat,
        createdby: req.body.createdby,
        approvedat: req.body.approvedat,
        approvedby: req.body.approvedby,
        status: req.body.status,
        deliveredat: '',
        items: items,
        grosstotal: req.body.grosstotal,
        receiveddiscounts: req.body.receiveddiscounts,
        damagedexpireditems: req.body.damagedexpireditems,
        total: req.body.total,
    });

    purchaseorder
        .save()
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'purchaseorderapprovaldata': {
                                'ponumber': result.ponumber,
                                'createdat': result.createdat,
                                'createdby': result.createdby
                            },
                        },
                    },
                    { upsert: true }
                )
                .exec()
                .then(result => { console.log("META DATA ADDED: ", result) })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ "Error": err });
                })

            res.status(201).json({
                message: "Handeling POST requests to /purchaseorders/create-purchaseorder, PURCHASE ORDER CREATED",
                type: 'success',
                alert: `${result.ponumber} added`,
            });
        })
        .catch(err => {

            console.log("ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add purchaseorder`,
            });
        })

});


//Get purchase order details by PO Number
router.get("/:ponumber", (req, res, next) => {

    PurchaseOrder
        .findOne({ ponumber: req.params.ponumber })
        .exec()
        .then(doc => {

            const purchaseorder = {
                'ponumber': doc.ponumber,
                'supplier': doc.supplier,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'customername': doc.customername,
                'customeraddress': doc.customeraddress,
                'contactnumber': doc.contactnumber,
                'approvedat': doc.approvedat,
                'approvedby': doc.approvedby,
                'deliveredat': doc.deliveredat,
                'status': doc.status,
                'items': doc.items,
                'grosstotal': doc.grosstotal,
                'receiveddiscounts': doc.receiveddiscounts,
                'damagedexpireditems': doc.damagedexpireditems,
                'total': doc.total,
            }

            res.status(200).json({
                message: "Handeling GET requests to  purchaseorder/:ponumber",
                purchaseorder: purchaseorder
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Update purchase order details by po number
router.post("/update-by-ponumber/:ponumber", formDataBody.fields([]), (req, res, next) => {

    console.log("UPDATE:", req.body);

    const items = JSON.parse(req.body.items);

    PurchaseOrder
        .findOneAndUpdate(
            { ponumber: req.params.ponumber },
            {
                'items': items,
                'deliveredat': req.body.deliveredat,
            },
            { new: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /employees/update-by-ponumber/:ponumber, PURCHASE ORDER UPDATED",
                type: 'success',
                alert: `${doc.ponumber} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update purchase order`,
            });
            console.log(err);
        });
})

//Update purchase order details by po number
router.post("/approve-by-ponumber/:ponumber", formDataBody.fields([]), (req, res, next) => {

    console.log("APPROVE PURCHASE ORDER:", req.body);

    const items = JSON.parse(req.body.items);

    PurchaseOrder
        .findOneAndUpdate(
            { ponumber: req.params.ponumber },
            {
                'items': items,
                'approvedat': req.body.approvedat,
                'approvedby': req.body.approvedby,
                'status': req.body.status,
            },
            { new: true }
        )
        .exec()
        .then(result => {

            const grn = new GRN({
                _id: new mongoose.Types.ObjectId(),
                ponumber: result.ponumber,
                grnnumber: `GRN-${result.ponumber}`,
                supplier: result.supplier,
                status: "Pending",
                items: items,
                addedat: "Pending",
                addedby: "Pending",
                grosstotal: result.grosstotal,
                damagedmissingitems: 0,
                total: result.total,
            });

            grn
                .save()
                .then(result => {

                    console.log("GRN ADDED: ", result)

                    MetaData
                        .findOneAndUpdate(
                            {},
                            {
                                $push: {
                                    'awaitinggrndata': {
                                        'ponumber': result.ponumber,
                                        'grnnumber': result.grnnumber,
                                        'status': result.status,
                                    }
                                },
                                $pull: {
                                    'purchaseorderapprovaldata': {
                                        'ponumber': result.ponumber
                                    }
                                }
                            },
                            { upsert: true }
                        )
                        .exec()
                        .then(result =>
                            console.log("META DATA ADDED: ", result)
                        )
                        .catch(err =>
                            console.log("META DATA ERROR: ", err)
                        )
                })
                .catch(err => {
                    console.log("GRN ERROR: ", err);
                })

            res.status(200).json({
                message: "Handling POST requests to /employees/approved-by-ponumber/:ponumber, PURCHASE ORDER APPROVED",
                type: 'success',
                alert: `${result.ponumber} approved`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update purchase order`,
            });
            console.log(err);
        });
})

module.exports = router;
