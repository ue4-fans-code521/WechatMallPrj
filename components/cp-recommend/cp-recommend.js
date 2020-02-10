// components/cp-recommend/cp-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rd: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isNeedLoad: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //我们需要在其中完成对于告知主页面的触发事件的工作
    //从而在其中可以测算出tab-nav距离顶端的距离.
    HandleBindLoad() {
      if (this.data.isNeedLoad) {
        // console.log("---图片已经加载---")
        this.triggerEvent("imageLoadComplete")
        this.data.isNeedLoad=false
      }
    }
  }
})