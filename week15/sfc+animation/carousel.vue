<template>
  <div>
    <img />
  </div>
</template><script>
export default {
  el: '#example',
  data: {
    message: 'hello'
  },
  computed: {
    reverseMessage: function () {
      let i = 1
      while (i < 100) {
        i++
      }
      return this.message.split('').reverse().join('')
    }
  }
}
</script>