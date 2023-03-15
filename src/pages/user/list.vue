<template>
  <div class="page page-list">
    <div class="container flex-col page-list__container">
      <Search class="page-list__search" @search="search" />
      <Tab :heads="['China', 'Kazahstan', 'Recieved']" class="page-list__tab">
        <ProductList :list="listMock" class="page-list__list" />
      </Tab>
      <Pagination :current="current" :total="5" @change="change" />
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
      current: 1,
      listMock: [
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
        {
          trackCode: 'string',
          description: 'string',
          userCode: 'string',
          branchDescription: 'string',
          productDetails: [
            {
              id: 0,
              createdDate: 'string',
              branchCode: 'string',
              branchDescription: 'string',
            },
          ],
        },
      ],
    }
  },
  methods: {
    change(n: number) {
      this.current = n
    },
    search(v: string) {
      console.log(v)
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
