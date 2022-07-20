# 项目启动和部署演示
项目框架：vue, ui：element-ui

#部署步骤：
# 安装依赖
$ npm install

# 本地启动服务
$ npm run dev

# 为生产和启动服务器构建
$ npm run build
$ npm run start
# 新功能开发
- 请使用 `feature/{功能名称}` 来命名你的分支
# 与商城、企点工作台联动部分
1. 进入商城http://dsshop.test:3002/  （配置host 114.132.159.89	dsshop.test）
2. 商品详情页点击在线咨询按钮，跳转到鉴权页进行认证。
3. 认证成功后跳转到在线咨询对话页，此时等待企点客服接入。
4. 登录客户端企点工作台端，提示客户已接入。
5. 右侧tab切换中包含会员信息，商品信息，订单信息。
6. 工作台右侧商品信息中点击任一商品，跳转回商城的商品详情中。

# demo相关功能说明
1. 工作台JsApi方法的相关引用：将单页面嵌入工作台前，需要对接jsapi事件，通过监听事件获取访客id。
  相关文档请查看https://api.qidian.qq.com/wiki/doc/open/em38kp0alvrxdpevsk2g。

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
              return id;
          }
    在单页面的created和mounted方法中引用,通过eventBus方法获取到访客id(cid)，以及当前组织架构下的企点用户id（bid）

          created() {
              jsApi.fetchjsApi();
          },
          mounted() {
              eventBus.$on('cid', (id) => {
                  this.uid = id
              });
              eventBus.$on('bid', (id) => {
                  this.bid = id
              });

          }
2. 商品信息和订单信息中发送消息功能，需调用发送webim信息接口，相关接口文档请查看https://api.qidian.qq.com/wiki/doc/open/em0ak81sklckg912oh1m。


          let arr = [];
          value.goods_list.map(i => {
              let arrObj = {
                  title: i.name,
                  picurl: i.img,
                  url: `http://dsshop.test:3002/product/detail/${i.good_id}`,
                  description: "描述"
              }
              arr.push(arrObj)
          })            
          let params = {
              fromuser: this.bid,
              touser: this.uid,
              msgtype: "news",
              news: {
                articles: arr
              }
          }
          let url=`sendMsgToC?msg=${encodeURI(JSON.stringify(params))}`
          request({
            url: url,
            method: 'post'
          }).then(res=>{
               this.$message.error(res.errmsg || res.message || '接口错误，请稍后再试');
          })

# 可定制化部分
以商城为例，会员信息，商品信息，订单信息等都是定制化的页面，开发完成后嵌入到工作台中即可。
