<template>
  <div class="comp-comment">
    <el-dialog
      v-model="dialogVisible"
      title="评论区"
      width="30%"
      align-center
      center
      draggable
    >
      <div v-if="!comments">
        <p>还没有评论，快来评论吧</p>
      </div>
      <div v-else>
        <template v-for="comment in comments" :key="comment">
          <p>{{ comment }}</p>
        </template>
      </div>
      <template #footer>
        <div class="comp-comment-form">
          <el-input
            type="textarea"
            v-model="commentValue"
            placeholder="发表个评论吧"
            clearable
          /><el-button type="primary" @click="handlerSubmitClick"
            >发送</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, computed } from 'vue'
import { ElMessage } from 'element-plus'
import localCache, { IArticle } from '@/utils/localCache'
const dialogVisible = ref(false)
const commentValue = ref('')
const articleId = ref('')
const allArticles = localCache.getCache('articles')

const handlerSubmitClick = () => {
  console.log(commentValue.value)
  commentValue.value = ''
  ElMessage({
    message: '评论成功',
    type: 'success'
  })
}

const comments = computed(() => {
  const value = allArticles.find(
    (item: IArticle) => item.id === articleId.value
  ).comments
  return value
})

defineExpose({
  dialogVisible,
  articleId
})
</script>

<style scoped>
.comp-comment-form {
  display: flex;
}
</style>
