export default {
  methods: {
    statusToString: function (status) {
      switch (status) {
        case 1: return '正在审核'
        case 2: return '审核通过'
        default: return '审核不通过'
      }
    },
    inFirstToString: function (inFirst) {
      return inFirst === 1 ? '是' : '否'
    }
  }
}
