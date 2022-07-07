/* jshint esversion: 6 */
import eventBus from '../../../../plugins/eventBus';
export default {
    fetchjsApi(){
        var id = 0;
        var handler = function (result) {
           var code = result.code,
                msg = result.msg,
                data = result.data;
                console.log(code,msg,data,"result");
                id = data.CID;
                eventBus.$emit('cid', id);
                eventBus.$emit('bid', data.BID);
        };
         qidian.registerEvent(
          {
          eventName: 'AIOCreate',
          listener: handler,
          fail: function (error) {
              var code = error.code,
                  msg = error.msg; 
                  console.log(code,msg);
          }
        });
        qidian.registerEvent(
          {
          eventName: 'AIOActivate',
          listener: handler,
          fail: function (error) {
              var code = error.code,
                  msg = error.msg; 
                  console.log(code,msg,"AIOActivate");
          }
        });
        return id;
      
    }
};