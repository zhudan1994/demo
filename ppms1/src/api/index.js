import axios from 'axios'
// 获取用户信息
export const getSetting = id => axios.get('api/my/getSetting/' + id)

// 获取我的未验证需求
export const checkingList = data => axios.post('api/my/checkingList', data)

// 获取我的已验证需求
export const releasedList = data => axios.post('api/my/releasedList', data)

// 获取发布管理列表
export const manageList = data => axios.post('api/manage/release', data)

// 新增发布计划
export const addManage = data => axios.put('api/manage/addrelease', data)

// 编辑发布计划
export const editManage = data => axios.post('api/manage/editRelease', data)

// 删除发布计划
export const deleteManage = params => axios.post('api/manage/deleteRelease/' + params)

// 获取某个发布计划详情
export const getPlanDetail = (id, data) => axios.post('api/manage/getPlanDetail/' + id, data)