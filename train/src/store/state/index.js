/**
 * 参数说明
 * @userInfo 用户登录信息
 * @allData 总数据
 * @weekPlanData 周计划数据
 * @nowIndex 点击未实施/已实施的索引值
 * @userIndex 当前登录用户在所有数据的索引值
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    allData: getLoc('allData') || {},
    weekPlanData: getLoc('weekPlanData') || [],
    nowIndex: -1,
    userIndex: 0
}