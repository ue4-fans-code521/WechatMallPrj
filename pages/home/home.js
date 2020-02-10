//需要注意的是:导入时必须使用相对路径

import {
  requestData,
  requestGoods
} from "../../serve/home.js"

//定义导航的细分商品的标签数组
const goodsCategory = ['pop', 'new', 'sell']
const TOP_DISTANCE = 600

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },

    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    //nav-tab距离顶部的长度保存在tabScrollTopDistance
    tabScrollTopDistance: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getRequestHome()
    this._getRequestGoods('pop')
    this._getRequestGoods('new')
    this._getRequestGoods('sell')
  },

  //首页商品数据的请求函数
  _getRequestGoods(type) {
    //我们通过请求的type类型,来获得现在的page+1的页面的数据
    var page = this.data.goods[type].page + 1
    requestGoods(type, page).then(res => {
      // 把获取到的返回的请求数据添加到原先的oldList中
      //通过type来获取原先旧list的数据
      var oldList = this.data.goods[type].list
      var newList = res.data.data.list

      oldList.push(...newList)
      //现在oldList中保存了新的请求数据,记下来我们就需要把数据保存到
      //data.goods中的相应的list中,但首先我们应该先设置两个key
      //注意:我们只能采用这样的赋值方式,才是正确的.
      var pageKey = `goods.${type}.page`
      var listKey = `goods.${type}.list`

      this.setData({
        [pageKey]: page,
        [listKey]: oldList
      })

      // console.log(res)
      // console.log(page, '---', oldList)

    })
  },
  // 轮播数据的请求函数
  _getRequestHome() {
    //我们在此拿到我们需要展示轮播的数据
    requestData().then(res => {
      // console.log(res)
      //我们需要把自己从服务器端获取的数据保存在data对象中
      this.setData({
        banners: res.data.data.banner.list,
        recommends: res.data.data.recommend.list

      })
    })
  },


  handleCpNav(event) {
    // console.log(event.detail.idx)
    var idx = event.detail.idx
    // 在此完成对于tabNav进行切换时更改currentType的值
    //从而完成对于不同的细分标签的商品的展示
    this.setData({
      currentType: goodsCategory[idx]
    })

  },

  onReachBottom() {
    this._getRequestGoods(this.data.currentType)
  },

  //我们需要在图片加载完成之后,来测试tab-nav距离顶端的距离
  handleImageLoadComplete() {
    // console.log("~~图片加载已经传递过来~~")
    wx.createSelectorQuery().select("#cp-nav")
      .boundingClientRect(rect => {
        // console.log(rect)
        //我们需要把获取到的tab-nav距离顶部数据保存下来
        this.data.tabScrollTopDistance = rect.top
      }).exec()
  },



  onPageScroll(options) {
    // console.log("-----",options,"-","-----")
    //我们需要判定,只有当滚动的距离大于某个数字的时候,才显示
    //回到顶部的标识
    var flag = options.scrollTop > TOP_DISTANCE
    if (flag) {
      this.setData({
        showBackTop: flag
      })
    }

    //需要判断tab-nav距离是否已经达到临界值,从而设置isTabFixed
    var flag1 = options.scrollTop >= this.data.tabScrollTopDistance
    if (flag1 !=this.data.isTabFixed) {
      //条件符合,更改相应的设置isTabFixed=true
      this.setData({
        isTabFixed: flag1
      })
    }
  }



})