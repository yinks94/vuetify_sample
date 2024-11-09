<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        title="Application">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="onIconClick"></v-app-bar-nav-icon>
        </template>

        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"></v-btn>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        permanent>
        <v-list color="transparent">
          <v-list-item
            v-for="link in links"
            :key="link"
            :title="link.title"
            :prepend-icon="link.icon"
            @click="itemClick(link.title)"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="d-flex align-left justify-left">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script setup>
import { ref } from 'vue'

const theme = ref('light')
const drawer = ref(true)

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function onIconClick() {
  console.log('app bar icon click')
  drawer.value = !drawer.value
}

function itemClick(title) {
  console.log('item click  ' + title)
}

const links = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Account', icon: 'mdi-account-box' },
  { title: 'Admin', icon: 'mdi-gavel' }
]

//', 'Messages', 'Profile', 'Updates']
</script>
