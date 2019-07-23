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
    _trainListData(state, trainListData) {
        setLoc('trainListData', trainListData);
        state.trainListData = trainListData;
    }
}