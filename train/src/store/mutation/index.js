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
    _actionListData(state, actionListData) {
        setLoc('actionListData', actionListData);
        state.actionListData = actionListData;
    },
    _notActionListData(state, notActionListData) {
        setLoc('notActionListData', notActionListData);
        state.notActionListData = notActionListData;
    },
    _suggestionData(state, suggestionData) {
        setLoc('suggestionData', suggestionData);
        state.suggestionData = suggestionData;
    },
    _weekPlanData(state, weekPlanData) {
        setLoc('weekPlanData', weekPlanData);
        state.weekPlanData = weekPlanData;
    },
    _nowIndex(state, nowIndex) {
        state.nowIndex = nowIndex;
    }
}