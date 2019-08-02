// 这里记录一些经常要用到的代码

//1.替换整个数组，并保存
/**
 * @oldActionData 获取未实施数据，保存
 * @userId 当前登录人ID，每个登录人ID对应相关数据
 * @nowIndex 所选项的index
 * @changeArr 所要替换的新数组
 */
let oldActionData = getLoc(this.userId).notActionData;
let arrLen = getLoc(this.userId).notActionData[this.nowIndex].trainImpleData.peoples.length;
//数组的替换
oldActionData[this.nowIndex].trainImpleData.peoples.splice(0, arrLen, ...changeArr);
//更新本地数据存储
setLoc(this.userId, { "notActionData": JSON.parse(JSON.stringify(oldActionData)) });

//向数组内push一项新的数据
oldActionData[this.nowIndex].commentData.push(this.$route.params.addData);
//更新同上