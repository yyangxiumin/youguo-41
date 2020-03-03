// pages/goods_list/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 关键字
    keyword: "",
    // 商品的列表
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // keyword是url中的参数
    const {keyword} = options;
    this.setData({
      keyword
    });
  }
})