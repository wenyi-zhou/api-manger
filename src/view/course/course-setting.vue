<template>
  <div>
    <subject></subject>
    <grade></grade>
  </div>
</template>

<script>
  import subject from './setting/setting-subject'
  import grade from './setting/setting-grade'

  export default {
    components: {
      subject,
      grade
    }
  }
</script>
