import request from '@/utils/request'

export default {
    //1.获取分页查询信息
    getRowList(current,limit,queryInfo) {
        return request({
            url: `/pageList/${current}/${limit}`,
            method: 'get',
            data: queryInfo
        })
    }, 

    
     //1.根据id删除记录
     deleteRow(id) {
        return request({
            url: `/${id}`,
            method: 'delete'
        })
    }, 

    //1.获取所有信息
    getAllRowlist() {
        return request({
            url: '/findAll',
            method: 'get'
        })
    }, 
    
    //1.添加信息
    saveRowList(row) {
        return request({
            url: '/save',
            method: 'post',
            data: row
        })
    }, 
    
      //1.天气预报
      getWeatherList() {
        return request({
            url: '/getWeather',
            method: 'get'
        })
    },

}