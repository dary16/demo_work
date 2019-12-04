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
    _userName(state, userName) {
        setLoc('userName', userName);
        state.userName = userName;
    },
    _timer(state, timer) {
        state.timer = timer;
    },
    _timeFlag(state, timeFlag) {
        state.timeFlag = timeFlag;
    },
    _timeIndex( state,timeIndex){
        state.timeIndex = timeIndex;
    },
    _isTimingNow( state,isTimingNow){
        state.isTimingNow = isTimingNow;
    },
    _unfinishedTime( state,unfinishedTime){
        state.unfinishedTime = unfinishedTime;
    },
    _unfinishedTimeIndex( state,unfinishedTimeIndex){
        state.unfinishedTimeIndex = unfinishedTimeIndex;
    },
}