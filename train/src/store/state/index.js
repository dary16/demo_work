/**
 * 参数说明
 * @userInfo 用户登录信息
 * @allData 总数据
 * @actionListData 已实施数据
 * @notActionListData 未实施数据
 * @suggestionData 意见建议数据
 * @weekPlanData 周计划数据
 * @nowIndex 点击的索引值
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    allData: getLoc('allData') || {},
    actionListData: getLoc('actionListData') || [],
    notActionListData: getLoc('notActionListData') || [],
    suggestionData: getLoc('suggestionData') || [],
    weekPlanData: getLoc('weekPlanData') || [],
    nowIndex: -1
}