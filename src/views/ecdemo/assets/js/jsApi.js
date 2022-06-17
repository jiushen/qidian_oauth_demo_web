import eventBus from '../../../../plugins/eventBus'
export default {
    fetchjsApi(){
        let id = 0
        var eventName = 'AIOCreate'; 
        var handler = function (result) {
            let code = result.code,
                msg = result.msg,
                data = result.data;
                console.log(code,msg,data,"result")
                id = data.CID
                eventBus.$emit('cid', id);
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