<template>
  <div class="page-edit">
    <div @click="handlerGoHomeClick" class="page-edit-svg">
      <svg
        t="1679218260410"
        class="page-edit-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2687"
        width="50"
        height="50"
      >
        <path
          d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
          fill="#d81e06"
          p-id="2688"
        ></path>
      </svg>
    </div>
    <div class="page-edit-title">
      <el-input
        v-model="formData.title"
        size="large"
        placeholder="请输入标题"
        clearable
      >
      </el-input>
      <el-button type="primary" size="large" @click="handlerEditCommit"
        >记录</el-button
      >
    </div>

    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="formData.valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, reactive, shallowRef, defineComponent } from 'vue'
import { IEditorConfig, IToolbarConfig, IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import localCache from '@/utils/localCache'
import { useRouter } from 'vue-router'

defineComponent({
  Editor,
  Toolbar,
  ElMessage
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const formData = reactive({
  valueHtml: ``,
  title: ''
})

const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...'
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 组件创建完毕时执行的回调
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

//设置评论数
const setComments = () => {
  let result: string[] = []
  for (let i = 0; i < 20; i++) {
    result.push('今天，也是元气满满的一天' + i)
  }
  return result
}

//点击记录后，满足条件，添加进localStorage中
const handlerEditCommit = () => {
  if (formData.title.length === 0) {
    ElMessage({
      message: '请给文章一个标题吧！',
      type: 'warning'
    })
    return ''
  }
  if (editorRef.value.getText().length === 0) {
    ElMessage({
      message: '请给文章添加一些内容哦！',
      type: 'warning'
    })
    return ''
  }
  localCache.setCache('articles', {
    id: new Date().getTime() + Math.random().toString(36).substring(2),
    date: new Date(),
    title: formData.title,
    content: formData.valueHtml,
    comments: setComments()
  })
}

const router = useRouter()
//返回按钮
const handlerGoHomeClick = () => {
  router.push('/')
}
const mode = 'simple'
</script>

<style scoped>
.page-edit {
  background: #2f4858;
  padding: 10px 40px 40px;
}
.page-edit-svg {
  width: 50px;
  cursor: pointer;
  margin-bottom: 10px;
}
.page-edit-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.page-edit-title .el-input {
  margin-right: 20px;
}
</style>
