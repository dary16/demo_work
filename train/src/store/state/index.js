/**
 * 参数说明
 * @userInfo 用户登录信息
 * @allData 总数据
 * @actionListData 已实施数据
 * @notActionListData 未实施数据
 * @trainListData 训练实施数据
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    allData: getLoc('allData') || {},
    actionListData: getLoc('actionListData') || [],
    notActionListData: getLoc('notActionListData') || [],
    trainListData: getLoc('trainListData') || []

}