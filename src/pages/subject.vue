<template>
  <div>
    <h1>subject.vue</h1>
    <h1>{{ storeMovie.movies.length }}</h1>
  </div>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="storeMovie.changeMessage('change message')">
          Change Message
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="changeStore(payload)">Change Message</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="searchMovie()">Search Movie</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-data-iterator
        class="w-100 height-screen"
        :loading="storeMovie.loading"
        :items="storeMovie.movies"
        :items-per-page="itemPerPage">
        <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
          <h1
            class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
            <div class="text-truncate">Search Movie</div>
            <div class="d-flex align-center">
              <v-btn
                class="me-8"
                variant="text"
                @click="onClickSeeAll">
                <span class="text-decoration-underline text-none">See all</span>
              </v-btn>
              <div class="d-inline-flex">
                <v-btn
                  :disabled="page === 1"
                  class="me-2"
                  icon="mdi-arrow-left"
                  size="small"
                  variant="tonal"
                  @click="prevPage"></v-btn>

                <v-btn
                  :disabled="page === pageCount"
                  icon="mdi-arrow-right"
                  size="small"
                  variant="tonal"
                  @click="nextPage"></v-btn>
              </div>
            </div>
          </h1>
        </template>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="12"
              sm="6"
              xl="3">
              <v-sheet border>
                <v-img
                  :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
                  :src="item.raw.Poster"
                  cover></v-img>
                <v-list-item
                  :title="item.raw.Title"
                  density="comfortable"
                  lines="two"
                  :subtitle="item.raw.Type">
                  <template v-slot:title>
                    <strong class="text-h6">
                      {{ item.raw.Title }}
                    </strong>
                  </template>
                </v-list-item>
                <v-table
                  class="text-caption"
                  density="compact">
                  <tbody>
                    <tr align="right">
                      <th>Year:</th>
                      <td>{{ item.raw.Year }}</td>
                    </tr>
                    <tr align="right">
                      <th>imdbID:</th>
                      <td>{{ item.raw.imdbID }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-sheet>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer="{ page, pageCount }">
          <v-footer
            class="justify-space-between text-body-2 mt-4"
            color="surface-variant">
            Total movies: {{ storeMovie.movies.length }}
            <div>Page {{ page }} of {{ pageCount }}</div>
          </v-footer>
        </template>
        <template v-slot:loader>
          <v-row>
            <v-col
              v-for="(_, k) in [0, 1, 2, 3]"
              :key="k"
              cols="12"
              sm="6"
              xl="3">
              <v-skeleton-loader
                height="500"
                class="border"
                type="image, article, card"></v-skeleton-loader>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-row>
  </v-container>
</template>

<script setup>
import { useMovieStore } from '@/stores/movie'
const storeMovie = useMovieStore()
const itemPerPage = ref(4)

const payload = {
  movies: ['movie1', 'movie2'],
  message: 'message from payload',
  loading: true
}

function changeStore(payload) {
  console.log('changeStore start.....!')
  storeMovie.updateState(payload)
}

function searchMovie() {
  console.log('search Movie.....!')
  storeMovie.searchMovies({ title: 'Frozen', year: [], type: 'movie' })
}

function onClickSeeAll() {
  console.log(`onClickSeeAll >>>> ${itemPerPage.value}`)
  itemPerPage.value = itemPerPage.value === 4 ? storeMovie.movies.length : 4
}
</script>

<style lang="scss" scoped></style>

<route>
{
  meta: {
    layout: "second"
  }
}
</route>
