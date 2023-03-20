<template>
  <div class="page-home">
    <div class="page-home-side">菜单栏</div>
    <div class="page-home-main" v-if="articles && articles.length !== 0">
      <el-input
        class="page-home-main-search"
        v-model="searchValue"
        placeholder="根据标题搜索文章吧"
        size="large"
        clearable
      />
      <template v-for="article in filterArticles" :key="article.id">
        <CompArticle
          :article="article"
          class="page-home-main-article"
          @showComment="handlerShowComment"
        ></CompArticle>
      </template>
      <div class="page-home-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="articles.length"
          :page-size="pageSize"
          @current-change="handlerCurrentChange"
        />
      </div>
    </div>
    <div v-else class="page-home-main">
      <h2>没有一篇文章</h2>
    </div>
    <CompComment ref="comCommentRef"></CompComment>
    <div class="page-home-edit" ref="editRef" @click="handlerEditIconClick">
      <svg
        t="1679217081946"
        class="page-home-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3628"
        width="50"
        height="50"
      >
        <path
          fill="#35E10E"
          ref="pathRef"
          d="M943.104 216.064q-8.192 9.216-15.36 16.384l-12.288 12.288q-6.144 6.144-11.264 10.24l-138.24-139.264q8.192-8.192 20.48-19.456t20.48-17.408q20.48-16.384 44.032-14.336t37.888 9.216q15.36 8.192 34.304 28.672t29.184 43.008q5.12 14.336 6.656 33.792t-15.872 36.864zM551.936 329.728l158.72-158.72 138.24 138.24q-87.04 87.04-158.72 157.696-30.72 29.696-59.904 58.88t-53.248 52.224-39.424 38.4l-18.432 18.432q-7.168 7.168-16.384 14.336t-20.48 12.288-31.232 12.288-41.472 13.824-40.96 12.288-29.696 6.656q-19.456 2.048-20.992-3.584t1.536-25.088q1.024-10.24 5.12-30.208t8.192-40.448 8.704-38.4 7.68-25.088q5.12-11.264 10.752-19.456t15.872-18.432zM899.072 478.208q21.504 0 40.96 10.24t19.456 41.984l0 232.448q0 28.672-10.752 52.736t-29.184 41.984-41.984 27.648-48.128 9.728l-571.392 0q-24.576 0-48.128-10.752t-41.472-29.184-29.184-43.52-11.264-53.76l0-570.368q0-20.48 11.264-42.496t29.184-39.936 40.448-29.696 45.056-11.776l238.592 0q28.672 0 40.448 20.992t11.776 42.496-11.776 41.472-40.448 19.968l-187.392 0q-21.504 0-34.816 14.848t-13.312 36.352l0 481.28q0 20.48 13.312 34.304t34.816 13.824l474.112 0q21.504 0 36.864-13.824t15.36-34.304l0-190.464q0-14.336 6.656-24.576t16.384-16.384 21.504-8.704 23.04-2.56z"
          p-id="3629"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue'
import CompArticle from '@/components/CompArticle.vue'
import CompComment from '@/components/CompComment.vue'
import localCache from '@/utils/localCache'
import { useRouter } from 'vue-router'

defineComponent({
  CompArticle,
  CompComment
})

const articles = localCache.getCache('articles') || []
//每页显示的页数
const pageSize = ref(4)
let filterArticles = ref(articles.slice(0, pageSize.value))

const comCommentRef = ref<InstanceType<typeof CompComment>>()
const editRef = ref<HTMLElement>()
const pathRef = ref<HTMLElement>()
const router = useRouter()
const searchValue = ref('')

const handlerShowComment = (id: string) => {
  if (comCommentRef.value) {
    comCommentRef.value.articleId = id
    comCommentRef.value.dialogVisible = true
  }
}
onMounted(() => {
  editRef.value?.addEventListener('mouseenter', () => {
    pathRef.value?.setAttribute('fill', '#d4237a')
  })
  editRef.value?.addEventListener('mouseleave', () => {
    pathRef.value?.setAttribute('fill', '#35E10E')
  })
})

const handlerEditIconClick = () => {
  router.push('/edit')
}

const handlerCurrentChange = (value: number) => {
  const result = articles.slice(
    (value - 1) * pageSize.value,
    (value - 1) * pageSize.value + pageSize.value
  )
  filterArticles.value = result
}
</script>

<style scoped>
.page-home {
  display: flex;
}
.page-home-side {
  width: 160px;
  height: 600px;
  border: 1px solid red;
  margin-right: 20px;
  background: #336f95;
}
.page-home-main {
  flex: 1;
  position: relative;
  border: 1px solid blue;
}
.page-home-main-search {
  margin: 10px 0;
}
.page-home-main-article {
  margin-bottom: 20px;
}
.page-home-main-article:hover {
  box-shadow: 4px 4px 3px #345563, -4px -4px 3px #345563;
}

.page-home-edit {
  position: fixed;
  left: 25px;
  bottom: 25px;
  cursor: pointer;
}
.page-home-pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
