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
    }
}