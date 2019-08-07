// 这里记录一些经常要用到的代码

//1.替换整个数组，并保存
/**
 * @oldActionData 获取未实施数据，保存
 * @userInfo 当前登录人对应相关数据
 * @nowIndex 所选项的index
 * @changeArr 所要替换的新数组
 */
let oldActionData = getLoc(this.userInfo.userID).notActionData;
let arrLen = getLoc(this.userInfo.userID).notActionData[this.nowIndex].trainImpleData.peoples.length;
//数组的替换
oldActionData[this.nowIndex].trainImpleData.peoples.splice(0, arrLen, ...changeArr);
//更新本地数据存储
setLoc(getLoc('userInfo').userID, {
    "notActionData": JSON.parse(JSON.stringify(oldActionData)),
    "loadTime": getLoc(this.userInfo.userID).loadTime
});

//向数组内push一项新的数据
oldActionData[this.nowIndex].commentData.push(this.$route.params.addData);
//更新同上