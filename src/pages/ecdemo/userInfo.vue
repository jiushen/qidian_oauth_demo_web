<template>
    <div class="userInfo">
        <div class="member-ship">
            <p class="member-ship-title">会员信息</p>
            <div class="member-ship-content">
                <div class="member-ship-item">
                    <div class="information ship-name">会员名</div>
                    <div v-if="shipObj.data && shipObj.data[0]">{{shipObj.data[0].nickname? shipObj.data[0].nickname : shipObj.data[0].name}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">性别</div>
                    <div v-if="shipObj.data && shipObj.data[0]">{{shipObj.data[0].gender_show}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">购买次数</div>
                    <div>{{shipObj.buy_count}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">最近购买</div>
                    <div>{{shipObj.buy_last_time}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">客单价</div>
                    <div v-if="isShipObj">¥{{shipObj.avr_order_price? parseFloat(shipObj.avr_order_price).toFixed(2) : 0}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">注册时间</div>
                    <div v-if="shipObj.data && shipObj.data[0]">{{shipObj.data[0].created_at}}</div>
                </div>

                <div class="member-ship-item">
                    <div class="information ship-name">状态</div>
                    <div v-if="shipObj.data && shipObj.data[0]">{{shipObj.data[0].state_show}}</div>
                </div>
                <div class="member-ship-item">
                    <div class="information ship-name">优惠券</div>
                    <div v-if="isShipObj">{{shipObj.coupon_count? shipObj.coupon_count:0 }}张</div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { openapi } from '@/api/user.js'
import jsApi from './assets/js/jsApi.js';
import eventBus from '../../plugins/eventBus'

export default {
    name:'userInfo',
    data() {
        return {
            shipObj:{},
            loading: true,
            uid:1,
            timer:null
        }
    },
    computed:{
      isShipObj() {
        return Object.keys(this.shipObj).length === 0? false : true
      }
        
    },
    created() {
        console.log("重新进入----------------------")
        this.setTimer();
        // jsApi.fetchjsApi();
        // this.fetchUser();
    },
    mounted() {
        eventBus.$on('cid', (id) => {
            this.fetchUser(id);
        })
    },
    methods: {
        fetchUser(id){
            let params = {
                uid:id
            }
            openapi(params).then(res => {
              if(res.message !== null){
                  this.shipObj = res || {};
                  this.loading = false
              }else{
                  this.$message.error("接口错误");
              }
            }).catch((error) => {
                this.loading = false
                this.$message.error(error.message || "加载错误");
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
    // 最后在beforeDestroy()生命周期内清除定时器：
		beforeDestroy() {
		    this.clearTimer()      
		    this.timer = null;
		},
}
</script>
<style lang='scss' scoped>
.userInfo{
    padding:20px;
    background-color: #fff;
    .member-ship {
        padding:0px 5px;
        &-title{
            color: rgba(38,45,61,1);
            font-size: 13px;
            font-weight: 500;
            text-align: left;
            margin-bottom:5px;
            line-height: 18px;
        }
        &-content{
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            .member-ship-item{
                line-height:24px;
                div{
                    display: inline-block;
                }
                .information {
                    color: rgba(138,147,169,1);
                }
                .ship-name{
                    width:15%;
                    min-width:62px;
                    margin-right:5px;
                }
                
            }

        }


    }
}


</style>