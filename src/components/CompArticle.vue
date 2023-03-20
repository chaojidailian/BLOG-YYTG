<template>
  <article class="comp-article">
    <header>
      <h2 class="comp-article-title">{{ article.title }}</h2>
      <p class="comp-article-info">
        <span class="comp-article-date"
          >创建于<span>{{ formatDate }}</span> |
        </span>
        <a href="javascript:;" @click="handlerShowComment(article.id)"
          ><span class="comp-article-comment"
            >评论: {{ commentLength }}</span
          ></a
        >
      </p>
    </header>
    <section class="comp-article-section">
      <div v-html="article.content"></div>
    </section>
  </article>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import { IArticle } from '@/utils/localCache'
const props = defineProps<{
  article: IArticle
}>()

const emit = defineEmits(['showComment'])

const formatDate = computed(() =>
  new Date(props.article.date).toLocaleDateString()
)
const commentLength = computed(() => {
  if (props.article.comments) {
    return props.article.comments.length
  } else {
    return 0
  }
})

const handlerShowComment = (id: string) => {
  emit('showComment', id)
}
</script>

<style scoped>
.comp-article {
  background: #006881;
  border-radius: 10px;
  text-align: center;
}
.comp-article header {
  margin-top: 20px;
  margin-bottom: 30px;
}
.comp-article-title {
  margin-bottom: 5px;
  font-size: 24px;
}
.comp-article-date,
.comp-article-comment {
  font-size: 14px;
}
.comp-article-date span {
  text-decoration: underline dotted;
}
.comp-article-section {
  margin: 20px 60px;
  text-align: start;
}
</style>
