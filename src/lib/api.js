import axios from 'axios';

axios.defaults.baseURL = "/sms/api";
//(개발할 때) npm start를 하면 NODE_ENV 값이 development가 들어가고 
//(운영할 때) npm run build를 하면 NODE_ENV 값이 다른 값이 들어간다. 
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:9000/sms/api";
}

export const postLicense = (formData) => {
    const data = {
        prdtId: formData.prdtId,
        lcnsTpCd: formData.lcnsTpCd,
        lcnsNo: formData.lcnsNo,
        lcnslssuDt: formData.lcnslssuDt,
        certNo: formData.certNo,
        lcnsStartDt: formData.lcnsStartDt,
        lcnsEndDt: formData.lcnsEndDt,
    }
    return axios.post('/lcns/create', data);
}

export const getLicense = () =>
    axios.get('/lcns/newest');


export const deleteLicenses = (licenseId) => {
    for (var i in licenseId) {
        return axios.delete(`/lcns/${licenseId[i]}`)
    }
}

export const postContracts = (formData) => {
    console.log("formData야야야야ㅑ",formData.lcns)
    const data = {
        prdtId: formData.prdtId,
        checkDt: formData.checkDt,
        lcns: formData.lcns,
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        installDt: formData.installDt,
        mtncStartDt: formData.mtncStartDt,
        mtncEndDt: formData.mtncEndDt,
        contReportNo: formData.contReportNo,
        contTpCd: formData.contTpCd,
    }
    return axios.post('/cont/create', data);
}
//계약 테이블 - 리스트 삭제
export const getDeleteContracts = (selectedRowKeys) => {
    for (var i in selectedRowKeys) {
        return axios.delete(`/cont/${selectedRowKeys[i]}`)
    }
}

//고객 테이블 - 삭제
export const deleteCustomer = (selectedRowKeys) => {
    for (var i in selectedRowKeys) {
        return axios.delete(`/cust/${selectedRowKeys[i]}`)
    }
}

export const updateCustomer = () => {
}

//고객 등록
export const postCustomer = (formData) => {
    const data = {
        orgId: formData.orgId,
        orgNm: formData.orgNm,
        custId: formData.custId,
        custNm: formData.custNm,
        custRankNm: formData.custRankNm,
        email: formData.email,
        telNo: formData.telNo,
    }
    return axios.post('/cust/create', data);
}
//기관 리스트
export const getOrganization = () =>
    axios.get('/org/aclist');

//계약 리스트
export const getContracts = () =>
    axios.get('/cont/showall');

//비투엔 담당자 리스트
export const getB2enManager = () =>
    axios.get('/b2en/aclist');

//기관 담당자 리스트
export const getManagers = () =>
    axios.get('/cust/showall');

//계약 코드 리스트
export const getcontCD = () =>
    axios.get('/cmmncd/cont_tp_cd');


export const getProducts = () =>
    axios.get('/prdt/aclist');

export const getLicenseCode = () =>
    axios.get('/cmmncd/lcns_tp_cd');

