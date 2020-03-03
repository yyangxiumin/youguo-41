import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue: "",
    // 搜索建议
    recommend: [],
    // 上次输入框的值
    lastValue: "",
    // 开关
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 监听输入框的输入事件
  handleInput(e) {
    // value是输入框的值
    const {
      value
    } = e.detail;
    this.setData({
      inputValue: value
    });

    // 如果value有值才发起请求
    if (!value) {
      // 把搜索建议的数组清空
      this.setData({
        recommend: []
      });

      return;
    };

    this.getRecommend();
  },
  getRecommend() {
    if (this.data.loading == false) {
      this.setData({
        recommend: message
      })
      // 请求搜索建议
      request({
        url: "/goods/qsearch",
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        const {
          message
        } = res.data;
        // 保存到搜索建议的数组
        this.setData({
          recommend: message,
          loading: false // 完成离开，出门时候就关灯
        });

        // 判断是否是inputValue值是最新,如果不是的话再次请求接口
        if (this.data.lastValue !== this.data.inputValue) {
          this.getRecommend();
        }
      })
    }

  },

  // 点击取消按钮时候触发的事件
  handleCancel() {
    // 清空输入框的值和搜索建议的列表
    this.setData({
      inputValue: "",
      recommend: ""
    })
  }
})