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
    _userData(state, userData) {
        setLoc('userData', userData);
        state.userData = userData;
    },
    _tabIndex(state, tabIndex) {
        state.tabIndex = tabIndex;
    },
}