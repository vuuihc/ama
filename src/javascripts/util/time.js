export default  {
    /**
     * 返回时间：5分钟，2小时，1天，1年
     * @param cb
     */
    getTimeSpan(time){
        console.log(time);
        let now = new Date();
        time = new Date(time);
        time = time.getTime();
        console.log(time);
        console.log(now.getTime())
        let seconds = (now.getTime() - time) / 1000;
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
