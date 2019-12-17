import React from 'react';
import { Modal } from 'antd';
import { Container, TextField, Grid, Button, Input } from '@material-ui/core/';
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
    textField: {
        '& input:valid + fieldset': {
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style

        },
    },
    textInput: {
        paddingTop: theme.spacing(2),
    },
    inputButton: {
        marginTop: theme.spacing(1),
    },
    dynamicSpan: {
        width: '100%',
    },

}));


const ContractModal = ({ licenseModalShow, visible,contCdList ,orgList, orgML, confirmLoading, handleOk, handleCancel, handleChangeInput, licenses, removeLicenseHandler }) => {
    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({ form: "contractModal", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "contractModal", key: key, value: value[key] });
        }
    }

    // const lcnsInputHandleChange = ev => {
    //     console.log("lcnsInputHandleChange", ev);
    //     console.log("name, hidden", ev.target.value, ev.target.hidden, ev.target.id, ev.target.value);
    //     inputPriceChange({ form: "contractModal", key: "contAmt", idx: ev.target.id, value: ev.target.value })

    // }

    //계약 일자 변경
    const [selectedcontDt, setSelectedcontDt] = React.useState(new Date());
    const handlecontDtChange = (id, date) => {
        setSelectedcontDt(date);
        handleChangeInput({ form: "contractModal", key: "contDt", value: date })
    };
    //설치 일자 변경
    const [selectedinstallDt, setSelectedinstallDt] = React.useState();
    const handleinstallDtChange = (id, date) => {
        setSelectedinstallDt(date);
        handleChangeInput({ form: "contractModal", key: "installDt", value: date })
    };
    //검수 일자 변경
    const [selectedcheckDt, setSelectedcheckDt] = React.useState(new Date());
    const handlecheckDtChange = (id, date) => {
        setSelectedcheckDt(date);
        handleChangeInput({ form: "contractModal", key: "checkDt", value: date })
    };
    //유지보수개시일 변경
    const [selectedmtncStartDt, setSelectedmtncStartDt] = React.useState(new Date());
    const handlemtncStartDtChange = (id, date) => {
        setSelectedmtncStartDt(date);
        handleChangeInput({ form: "contractModal", key: "mtncStartDt", value: date })
    };
    //유지보수종료일 변경
    const [selectedmtncEndDt, setSelectedmtncEndDt] = React.useState(new Date());
    const handlemtncEndDtChange = (id, date) => {
        setSelectedmtncEndDt(date);
        handleChangeInput({ form: "contractModal", key: "mtncEndDt", value: date })
    };

    return (
        <Modal
            title="계약정보 등록"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{ top: 25 }}
            width="60%"
            maskClosable={false}
        >
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="orgId"
                                options={orgList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.orgNm}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="기관명"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="empId"
                                options={orgML}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.empNm}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="담당자명"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="contTpCd"
                                options={contCdList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="계약 유형"
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
                                name="expire"
                                label="수주보고서 번호"
                                id="contReportNo"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </Grid>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="installDt"
                                    label="설치일자"
                                    fullWidth
                                    value={selectedinstallDt}
                                    onChange={handleinstallDtChange}
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
                                    id="checkDt"
                                    label="검수일자"
                                    fullWidth
                                    value={selectedcheckDt}
                                    onChange={handlecheckDtChange}
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
                                    id="mtncStartDt"
                                    label="유지보수 개시일"
                                    fullWidth
                                    value={selectedmtncStartDt}
                                    onChange={handlemtncStartDtChange}
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
                                    id="mtncEndDt"
                                    label="유지보수 종료일"
                                    fullWidth
                                    value={selectedmtncEndDt}
                                    onChange={handlemtncEndDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button onClick={licenseModalShow} variant="outlined">라이센스 등록</Button>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="contDt"
                                    label="계약일자"
                                    fullWidth
                                    value={selectedcontDt}
                                    onChange={handlecontDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                    </Grid>

                    {licenses.map((license, index) => (

                        <LicenseItem

                            license={license}
                            key={index}
                            id={index.toString()}
                            keyvar={index}
                            removeLicenseHandler={removeLicenseHandler}
                            classes={classes}
                        >
                            {console.log("kwon Index", index)}
                        </LicenseItem>
                    ))}

                </form>
            </Container>
        </Modal>
    );
}
const LicenseItem = ({ keyvar, license, removeLicenseHandler, classes }) => {
    return (
        <Grid container spacing={2} >
            {console.log("indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    defaultValue={"제품명: " + license.licenseForm.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Input
                    className={classes.textInput}
                    defaultValue={"납품 단가: " + license.licenseForm.contAmt + "원"}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />

            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeLicenseHandler(keyvar)}
                >삭제
                </Button>
            </Grid>
        </Grid>
    );
};

export default ContractModal;