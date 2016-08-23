export default  {
    /**
     * 返回时间：5分钟，2小时，1天，1年
     * @param cb
     */
    getTimeSpan(time){
        // console.log(`params time is ${time}`)
        let now = new Date();
        let timestamp = new Date(time).getTime();
        if(timestamp.toString().length==13){
            timestamp = timestamp/1000;
        }
        let seconds = (now.getTime()/1000 - timestamp);
        if( seconds < 60){
            return parseInt(seconds) + ' 秒';
        }else if( seconds < 3600){
            return parseInt(seconds / 60) + ' 分钟';
        }else if( seconds < 86400){
            return parseInt(seconds / 3600) + ' 小时';
        }else if( seconds < 2592000){
            return parseInt( seconds / 86400) + ' 天';
        }else if( seconds < 31536000){
            return parseInt( seconds / 2592000) + ' 个月';
        }else{
            return parseInt( seconds / 31536000) + ' 年';
        }
    }
}
