/**
 * 参数说明
 * @userInfo 用户登录信息
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    allData: getLoc('allData') || {}
}