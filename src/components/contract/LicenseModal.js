import React, { useEffect, useState } from 'react';
import { Modal, Upload, Icon,Button as AntButton } from 'antd';
import { Container, TextField, Grid, Button, InputAdornment } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const useStyles = makeStyles(theme => ({

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    // textField: {
    //     '& input:valid + fieldset': {
    //         borderWidth: 2,
    //     },
    //     '& input:invalid + fieldset': {
    //         borderWidth: 2,
    //     },
    //     '& input:valid:focus + fieldset': {
    //         borderLeftWidth: 6,
    //         padding: '4px !important', // override inline-style

    //     },

    // },
    imageStyle: {
        marginTop: theme.spacing(-6.5)
    },
    iconStyle: {
        marginLeft: theme.spacing(1)
    },
    inline: {
        display: "inline-block"
    },
    antBtn: {
        marginTop: theme.spacing(3)
    }

}));

const LicenseModal = ({ handleUpdateCancel,
    updateOk,
    btnFlag,
    lcnsBtnFlag,
    imageHandleRemove,
    visible,
    confirmLoading,
    requestLcns,
    handleOk,
    handleCancel,
    handleChangeInput,
    licenseCodeList,
    productList,
    licenseForm }) => {

    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "licenseForm", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "licenseForm", key: key, value: value[key] });
        }
    }
    const licenseCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "licenseForm", key: "lcnsTpNm", value: value["cmmnDetailCdNm"] });
    }
    //발행일 변경
    const handlelcnsIssuDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsIssuDt", value: date })
    };
    //개시일자 변경
    const handlelcnsStartDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsStartDt", value: date })
    };
    //종료일자 변경
    const handlelcnsEndDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsEndDt", value: date })
    };

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        console.log("useEffect", licenseForm.fileList);
        setFileList(licenseForm.fileList.concat());
    }, [licenseForm.fileList])

    console.log("fileList::", fileList);
    const token = () => {
        const auth = JSON.parse(sessionStorage.getItem("auth")) ? JSON.parse(sessionStorage.getItem("auth")) : null;
        console.log("token 호출",auth)
        if (auth && auth.token) {
            console.log("token", auth.token)
            return auth.token
        }
        return ""
    }
    
    const props2 = {
        //action: 'http://localhost:9000/sms/api/scan/upload',
        action: '/sms/api/scan/upload',
        listType: 'picture',
        className: 'upload-list-inline',
        headers: {Authorization:token()},
        fileList: fileList,
        onChange(info) {
            let newFileList = [...info.fileList];
            setFileList(newFileList)
        },
        onRemove(file) {
            console.log("onRemove", fileList, file)

            const arr = []
            arr.push(file)
            setFileList(fileList.filter((v, index) => v.uid !== file.uid))
            imageHandleRemove(arr, fileList)
            return false;
        },
    };

    return (
        <Modal
            title="제품 등록"
            visible={visible}
            onOk={() => { setFileList([]); btnFlag ? handleOk(fileList) : updateOk(fileList) }}
            okText={btnFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={() => { setFileList([]); btnFlag ? handleCancel(licenseForm.fileList) : handleUpdateCancel() }}
            cancelText="취소"
            style={{ top: 65 }}
            width="35%"
            maskClosable={false}
        >

            <Container component="main" fixed>
                <form className={classes.form} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="prdtId"
                                options={productList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.prdtNm}
                                inputValue={licenseForm.prdtNm}
                                value={{ prdtNm: licenseForm.prdtNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="제품 이름"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="contAmt"
                                label="납품 가격"
                                id="contAmt"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">원</InputAdornment>,
                                }}
                                inputProps={{
                                    step: 10000,//만 원씩
                                    min: "0"
                                }}
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.contAmt}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="lcnsTpCd"
                                options={licenseCodeList}
                                onChange={licenseCodeHandleChange}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                inputValue={licenseForm.lcnsTpNm}
                                value={{ cmmnDetailCdNm: licenseForm.lcnsTpNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="라이센스 유형"
                                        fullWidth
                                        value={licenseForm.lcnsTpNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="certNo"
                                label="증명 번호"
                                id="certNo"
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.certNo}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="lcnsNo"
                                label="라이센스 번호"
                                id="lcnsNo"
                                InputProps={{
                                    endAdornment: <AntButton  variant="outlined" loading={lcnsBtnFlag} onClick={requestLcns}>
                                    번호 생성
                                </AntButton>
                                }}
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.lcnsNo}
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsIssuDt"
                                    label="발행일"
                                    fullWidth
                                    value={licenseForm.lcnsIssuDt}
                                    onChange={handlelcnsIssuDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsStartDt"
                                    label="계약일자"
                                    fullWidth
                                    value={licenseForm.lcnsStartDt}
                                    onChange={handlelcnsStartDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsEndDt"
                                    label="종료일자"
                                    fullWidth
                                    value={licenseForm.lcnsEndDt}
                                    onChange={handlelcnsEndDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>

                        </MuiPickersUtilsProvider>
                    </Grid>
                </form>

                <div className={classes.imageStyle}>
                    <Upload {...props2}
                    >
                        <Button size="large" variant="outlined">
                            스캔본 <Icon className={classes.iconStyle} type="upload" />
                        </Button>
                        {/* {licenseForm.imageFile === {} ?
                             : ""} */}

                    </Upload>
                </div>
            </Container>
        </Modal >
    );
}
export default LicenseModal;
