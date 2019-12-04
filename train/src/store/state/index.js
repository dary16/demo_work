/**
 * 参数说明
 * @userInfo 用户登录信息
 * @allData 总数据
 * @weekPlanData 周计划数据
 * @nowIndex 点击未实施/已实施的索引值
 * @userData 用户数据
 * @tabIndex 存储已实施或未实施
 * @userName 当前登录人
 * @timer 计时时间
 * @timeFlag 计时器方法标识，用于结束计时器使用
 * @timeIndex 正在计时的数组下标，用于结束计时存储对应数据使用
 * @isTimingNow 是否正在计时，用于控制单个内容计时
 */
import {
    getLoc
} from '../../utils/common.js';
export default {
    userInfo: getLoc('userInfo') || {},
    allData: getLoc('allData') || {},
    weekPlanData: getLoc('weekPlanData') || [],
    nowIndex: -1,
    userData: getLoc('userData') || [],
    tabIndex: 1,
    userName: getLoc('userName') || {},
    timer: '',
    timeFlag: 0,
    timeIndex: 0,
    isTimingNow: false,
    unfinishedTime: -1,
    unfinishedTimeIndex: -1,
}