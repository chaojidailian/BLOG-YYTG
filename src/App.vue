<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html {
  background: #2f4858;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: white;
}
.app {
  display: flex;
  justify-content: center;
  padding: 0 20px;
}
</style>
