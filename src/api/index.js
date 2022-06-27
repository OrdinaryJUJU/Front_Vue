import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://www.lijx.cloud:8087/safe_park/space/listBy.json',
        method: 'get',
        params: query
    });
};
export const loginValidate = param => {
	return request({
		url: 'http://localhost:8081/user/login',
		method: 'post',
		params: param
	});
};
export const register = param => {
	return request({
		url: 'http://localhost:8081/user/register',
		method: 'post',
		params: param
	});
};
//变化检测
export const changedetection = param => {
	return request({
		url: 'http://localhost:8081/changedetection/',
		headers: {'token': localStorage.token},
		method: 'post',
		params: param
	});
};
// export const fetchSpace = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/area/searchByAreaId.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// export const fetchNum = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/area/countAll.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// export const fetchAuth = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/manager/auth.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //通过手机号查询停车场车辆
// export const fetchSpaceByTel = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/space/listBy.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //通过车牌号查询停车场车辆
// export const fetchSpaceByCId = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/space/listBy.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //查询全部违规记录
// export const fetchIllList = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/ill_record/list.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //通过手机号查询违规记录
// export const fetchIllBytel = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:88087/safe_park/ill_record/listBy.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //通过车牌号查询违规记录
// // 0-通过记录号查询
// // 1-业主ID查询
// // 2-时间查询
// // 3-车牌号查询
// // 4-手机号查询
// export const fetchIllByCId= param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:88087/safe_park/ill_record/listBy.json',
// 		method: 'get',
// 		params: param
// 	});
// };
// //车辆信息注册
// export const carRegister = param => {
// 	return request({
// 		url: 'http://www.lijx.cloud:8087/safe_park/owner/add.json',
// 		method: 'post',
// 		params: {AccessToken:localStorage.token},
// 		data:param,
// 	});
// };



