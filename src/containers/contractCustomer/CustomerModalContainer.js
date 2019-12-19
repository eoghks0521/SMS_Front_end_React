import React from 'react';
import CustomerModal from "../../components/contractCustomer/CustomerModal";
import {useDispatch, useSelector} from "react-redux";
import { connect } from 'react-redux';
import { handleOk, handleChangeInput, getHandleCancel } from "../../modules/contractCustomer/contractcustomermodal";
import { getCustomerList } from "../../modules/contractCustomer/contractcustomer";

const CustomerModalContainer = ({
    visible,
    orgList,
    orgNameList,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    custCdList,
}) => {

    const dispatch = useDispatch();
    const {formData} = useSelector(({contractcustomermodal})=>({formData : contractcustomermodal.contractCustomerModal}))

    const okok = () =>{
        handleOk(formData);
        dispatch(getCustomerList())
    }

    return(
        <CustomerModal
            visible={visible}
            handleOk={okok}
            confirmLoading={confirmLoading}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            orgList={orgList}
            orgNameList={orgNameList}
            custCdList={custCdList}
        />
    );
};

export default connect(
    ({ contractcustomermodal }) => ({
        visible: contractcustomermodal.visible,
        confirmLoading: contractcustomermodal.confirmLoading,
        contractCustomerModal: contractcustomermodal.contractCustomerModal,
        orgList: contractcustomermodal.orgList,
        orgNameList: contractcustomermodal.orgNameList,
        custCdList: contractcustomermodal.custCdList,
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel,
    }
)(CustomerModalContainer);