<template>
    <div class="ecsetting-demo-order">
        <div class="order-search">
            <el-input v-model="keyWords" prefix-icon="el-icon-search" placeholder="请输入内容" 
                      @change="fetchOrders()">
            </el-input>
        </div>
        <div class="order-goods"
            v-infinite-scroll="loadList"
            infinite-scroll-disabled="disabled"
            v-for="(item, index) in listData" :key="index"
        >
            <div class="status">{{item.state_show}}</div>
            <div class="fix goods">
                <div class="goods-img"
                    v-for="(tt, idx) in item.goods_list" :key="idx">
                    <img v-show= "idx < 3" :src="tt.img"/>
                    <div class="info" v-show="item.goods_list.length === 1">
                        <div class="title ell">{{tt.name}}</div>
                        <div class="color ell" v-for="(i,idex) in tt.good_sku.product_sku" :key="idex">
                            {{i.key}} : {{i.value}}
                        </div>
                    </div>
                </div>
                <div class="price">
                    <div class="money">¥{{item.total}}</div>
                    <div class="operation">
                        <span>共{{item.goods_list.length}}件</span>
                        <a href="javascript:void(0)" @click="sendData(item)">
                          <img src="./assets/icons/normal.png"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-no-data" v-show="listData.length===0 && !loading">暂无数据</div>
        <p v-show="loading" class="loading">列表加载中...</p>
    </div>
</template>

<script>
  import { orderList} from '@/api/user'
  import jsApi from './assets/js/jsApi.js';
  import eventBus from '../../plugins/eventBus'
  import request from '@/plugins/request'
  export default {
    name: 'ecsettingOrder',
    data() {
      return {
        keyWords: '',
        listData: [],
        loading: false,
        currentPage: 1, // 当前第几页
        maxPage: 1,    // 总共多少页
        count: 5,
        uid: 1,
        bid:1,
        token:'',
        timer:null
      }
    },
    computed: {
      queryParams() {
        return {
          limit: this.count,
          page: this.currentPage,
          index: 0,
          sort: '-created_at',
          uid: this.uid,
          keywords:this.keyWords
        }
      },
      disabled () {
          return this.loading;
      }
    },
    methods: {
        // 初始化数据
        initData() {
          if(this.currentPage === 1){
              this.listData = []
          }
          this.loading = true;
          orderList(this.queryParams).then(res => {
              if(res.message !== null){
                  this.loading = false;
                  this.maxPage = Math.ceil(res.total / this.count);
                  let arr = res.data;
                  if (this.currentPage > 1) {
                      this.listData = this.listData.concat(arr)
                  }
                  else {
                      this.listData = arr;
                  }
              }else{
                  this.$message.error("接口错误");
              }
          }).catch((err) => {
              this.loading = false
              this.$message.error(err.message || "加载错误");
          })
        },
        loadList() {
            console.log(this.currentPage ,this.maxPage,'1111')
            if (this.currentPage < this.maxPage) {
                this.currentPage ++;
                this.initData()
            }
        },
        fetchOrders(){
            this.currentPage = 1
            this.listData = []
            this.initData()
        },
        // 发送
        sendData(value) {
          console.log('value', value); 
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
              console.log(res,"res=============")
          })
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        setTimer() {
            this.timer = setTimeout(() => {
                jsApi.fetchjsApi();
                this.clearTimer()
            }, 100);
        }
    },
    created() {
        console.log("重新进入----------------------")
        this.setTimer();
        // jsApi.fetchjsApi();
        // this.initData();
    },
    mounted() {
        eventBus.$on('cid', (id) => {
            console.log(id,"id===============")
            this.uid = id
            this.initData();
        });
        eventBus.$on('bid', (id) => {
            console.log(id,"bid===============")
            this.bid = id
        });

    },
    // 最后在beforeDestroy()生命周期内清除定时器：
		beforeDestroy() {
		    this.clearTimer()      
		    this.timer = null;
		}
  }
</script>

<style lang='scss'>
  @import "./assets/scss/order";
</style>
