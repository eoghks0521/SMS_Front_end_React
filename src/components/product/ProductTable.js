import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles, Button } from '@material-ui/core/';
import { Dropdown, Icon, Menu, Table } from "antd";

const textcolor = '#174A84';

const ColorButton = withStyles(theme => ({
    root: {
        borderColor: '#0062cc',
        '&:hover': {
            borderColor: '#0062cc',
        },
    },
}))(Button);

const RemoveButton = withStyles(theme => ({
    root: {
        borderColor: '#0062cc',
        '&:hover': {
            borderColor: '#0062cc',
        },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    option: {
        marginTop: theme.spacing(16),
        marginBotton: theme.spacing(8),
    },
    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },
    menuName: {
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
    button: {
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(5),
        textAlign: 'right',
        marginTop: -21,
    },
    plusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        fontWeight: 'bold'
    },
    minusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        fontWeight: 'bold'
    },
}));

const ProductTable = ({ productList, loadingTable, getDeleteProduct, showUpdateModal, showModal, changeButton }) => {
    const classes = useStyles();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleMenuClick = key => {
        console.log("key", key);
        showUpdateModal(key)
    }
    const columns = [
        {
            title: '이름',
            dataIndex: 'prdtNm',
            align: 'center',

        },
        {
            title: '가격',
            dataIndex: 'prdtAmt',
            align: 'right',
            render: (value, record, index) => {
                return {
                    children: (value == null ? "-" : parseInt(value) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 만원 ",
                    props: {
                        align: 'right',
                    },
                };
            }
        },
        {
            title: '설명',
            dataIndex: 'prdtDesc',
            align: 'center',
        },
        {
            title: '',
            dataIndex: 'menuTag',
            width: '5%',
            render: (text, record) =>
                (<Dropdown
                    overlay={(
                        <Menu onClick={() => {
                            handleMenuClick(record.prdtId)
                            changeButton()
                        }}>
                            <Menu.Item >
                                수정
                                </Menu.Item>
                        </Menu>
                    )}

                    placement="bottomLeft">

                    <Button size="small"><Icon type="menu" /></Button>
                </Dropdown>
                )
        },
    ];

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginLeft: 8, textAlign: 'left' }}>
                {hasSelected ? `${selectedRowKeys.length} 개 선택` : '0 개 선택'}
            </div>

            <div className={classes.button}>
                <span style={{ paddingRight: 14 }}>

                    <ColorButton
                        onClick={showModal}
                        className={classes.plusbutton}
                        size='small'
                        variant="outlined"
                        color="primary"
                        endIcon={<AddIcon />}
                    > 제품 등록
              </ColorButton>
                </span>
                <RemoveButton
                    className={classes.minusbutton}
                    size='small'
                    variant="outlined"
                    color="secondary"
                    endIcon={<RemoveIcon />}
                    onClick={() => { getDeleteProduct(selectedRowKeys); setSelectedRowKeys([]); }}
                > 제품 삭제
                </RemoveButton>
            </div>
            <Table
                rowKey="prdtId"
                loading={loadingTable}
                tableLayout='undefined'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={loadingTable ? null : productList}
                size="small" />
        </div>
    );
}
export default ProductTable;