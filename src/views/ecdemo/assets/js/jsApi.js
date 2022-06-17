export default {
    fetchjsApi(){
        let id = 0
        var eventName = 'AIOActivate'; 
        var handler = function (result) {
            let code = result.code,
                msg = result.msg,
                data = result.data;
                console.log(code,msg,data,"result")
                id = data.CID
        };
         qidian.registerEvent(
          {
          eventName: eventName,
          // Channel:0,
          listener: handler,
          fail: function (error) {
              var code = error.code,
                  msg = error.msg; 
          }
        })
        return id
      
    }
}