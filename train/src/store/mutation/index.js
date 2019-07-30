import {
    setLoc
} from '../../utils/common.js';
export default {
    _userInfo(state, userInfo) {
        setLoc('userInfo', userInfo);
        state.userInfo = userInfo;
    },
    _allData(state, allData) {
        setLoc('allData', allData);
        state.allData = allData;
    },
    _weekPlanData(state, weekPlanData) {
        setLoc('weekPlanData', weekPlanData);
        state.weekPlanData = weekPlanData;
    },
    _nowIndex(state, nowIndex) {
        state.nowIndex = nowIndex;
    },
    _userIndex(state, userIndex) {
        state.userIndex = userIndex;
    },
    _userId(state, userId) {
        state.userId = userId;
    },
    _realName(state, realName) {
        state.realName = realName;
    }
}