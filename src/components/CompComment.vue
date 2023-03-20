<template>
  <div class="comp-comment">
    <el-dialog
      v-model="dialogVisible"
      title="评论区"
      width="30%"
      height="50%"
      align-center
      center
      draggable
    >
      <div v-if="filterComments?.length === 0">
        <p>还没有评论，快来评论吧</p>
      </div>
      <div v-else>
        <ul
          v-infinite-scroll="load"
          class="infinite-list"
          style="overflow: auto"
        >
          <li
            v-for="comment in filterComments"
            :key="comment"
            class="infinite-list-item"
          >
            {{ comment }}
          </li>
          <li v-if="noMore" class="no-more-item">没有更多了</li>
        </ul>
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
import { ref, defineExpose, watch } from 'vue'
import { ElMessage } from 'element-plus'
import localCache, { IArticle } from '@/utils/localCache'
const dialogVisible = ref(false)
const commentValue = ref('')
const articleId = ref('')
const allArticles = localCache.getCache('articles')
const commentCount = ref(5)
const commentOffset = ref(0)
const noMore = ref(false)

//发送评论
const handlerSubmitClick = () => {
  console.log(commentValue.value)
  commentValue.value = ''
  ElMessage({
    message: '评论成功',
    type: 'success'
  })
}

let filterComments = ref<string[]>()
let result: string[]
watch(
  articleId,
  () => {
    result = allArticles.find(
      (item: IArticle) => item.id === articleId.value
    ).comments
    filterComments.value = result.slice(0, commentCount.value)
    commentOffset.value = 0
    noMore.value = false
  },
  {
    immediate: false
  }
)

const load = () => {
  if (filterComments.value) {
    commentOffset.value += 1
    filterComments.value.push(
      ...result.slice(
        commentCount.value * commentOffset.value,
        commentCount.value * commentOffset.value + commentCount.value
      )
    )
    if (filterComments.value.length === result.length) {
      noMore.value = true
    }
  }
}

defineExpose({
  dialogVisible,
  articleId
})
</script>

<style scoped>
.comp-comment-form {
  display: flex;
}
.infinite-list {
  height: 200px;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100vw;
  background: #336f95;
  color: white;
  height: 50px;
  margin: 10px;
}
.no-more-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
