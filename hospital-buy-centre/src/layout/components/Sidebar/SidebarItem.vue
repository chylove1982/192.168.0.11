<template>
  <div v-if="item.show" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.subMenu,item) && (!onlyOneChild.subMenu||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild" :to="resolvePath(onlyOneChild.url)">
        <el-menu-item :index="resolvePath(onlyOneChild.url)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.icon||(item.meta&&item.icon)" :title="onlyOneChild.name" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.url)" popper-append-to-body>
      <template slot="title">
        <item v-if="item" :icon="item && item.icon" :title="item.name" />
      </template>
      <!--:key="child.url"-->
      <sidebar-item
        v-for="child in item.subMenu"
        :is-nest="true"
        :item="child"
        :base-url="resolvePath(child.url)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { isExternal } from '@/utils/validate'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      this.onlyOneChild = null
      return {}
    },
    methods: {
      hasOneShowingChild(subMenu = [], parent) {
        const showingChildren = subMenu.filter(item => {
          if (!item.show) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            console.log('this.onlyOneChild',this.onlyOneChild)
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          console.log('showingChildren.length',showingChildren.length)
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>
