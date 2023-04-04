<template>
  <div class="page page-list">
    <div class="container flex-col page-list__container">
      <Search class="page-list__search" @search="search" />
      <Tab
        :heads="tabs"
        :current="tabType"
        class="page-list__tab"
        @select="select"
      >
        <ProductList :list="listMock" class="page-list__list" />
      </Tab>
      <Pagination :current="currentPage" :total="totalPage" @change="change" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Tab from 'components/ui/Tab.vue'
import ProductList from 'components/product/ProductList.vue'
import Pagination from 'components/ui/Pagination.vue'
import Search from 'components/ui/Search.vue'

export default Vue.extend({
  name: 'PageUserList',
  components: { Tab, ProductList, Pagination, Search },
  layout: 'user',
  data() {
    return {
      tabType: 0,
      currentPage: 1,
      searchText: '',
      totalPage: 10,
      tabs: ['china', 'kazahstan', 'recieved'],
      listMock: [],
    }
  },
  methods: {
    select(type: string) {
      this.currentPage = 0
      this.searchText = ''
      this.tabType = this.tabs.findIndex((e) => e === type)
      this.getList()
    },
    change(pageNumber: number) {
      this.currentPage = pageNumber
      this.getList()
    },
    search(searchText: string) {
      this.searchText = searchText
      this.getList()
    },
    async getList() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$repositories.product.getProducts({
          code: this.searchText,
          branchGroup: this.tabType,
          page: this.currentPage,
        })
        console.log(res)
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page-list {
  overflow: hidden;

  &__container {
    height: 100%;
    overflow: hidden;
    max-width: 570px;
  }

  &__search {
    margin-bottom: 1.4rem;
  }

  &__tab {
    flex-grow: 1;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  &__list {
    height: 100%;
  }
}
</style>
