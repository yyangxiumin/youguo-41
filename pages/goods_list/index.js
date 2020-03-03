import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 关键字
    keyword: "",
    // 商品的列表
    goods: [],
    // 是否有更多
    hasMoer: true,
    pagenum: 1,
    // 是否正在加载
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options;
    this.setData({
      keyword
    });

    // 请求商品列表数据
    this.getGoods();


  },
  getGoods() {
    // 如果没有更多了，就不会再请求
    if (this.data.hasMore == false) {
      return;
    }
    setTimeout(v => {
      // 请求商品列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: 10
        }
      }).then(res => {
        // console.log(res)
        const {
          message
        } = res.data;
        const goods = message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })
        // 把message商品添加带list
        this.setData({
          // 合并原来的列表和新请求回来的商品列表
          goods: [...this.data.goods, ...goods],
          // 当前这次请求完毕
          loading: false
        });

        // 判断是否是最后一页
        if (this.data.goods.length >= message.total) {
          this.setData({
            hasMore: false
          })
        }
      })
    }, 2000)
  },
  // 页面上拉触底时候触发
  onReachBottom() {
    // 页数加1
    // 需要等到上一次的请求回来了再执行下一页的数据
    if (this.data.loading === false) {

      this.setData({
        // 每次发起请求前重新设置loadig为正在加载
        loading: true,
        // 页数加1
        pagenum: this.data.pagenum + 1
      });
      // 请求商品列表
      this.getGoods();
    }
  }
})