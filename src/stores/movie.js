import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    totalResults: '',
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  getters: {
    getMessage() {
      return this.message
    },
    getValue(key) {
      return this[key]
    }
  },
  actions: {
    changeMessage(message) {
      this['message'] = message
    },
    updateState(payload) {
      Object.keys(payload).forEach(key => (this[key] = payload[key]))
    },
    resetMovies() {
      this.movies = []
      this.message = _defaultMessage
      this.loading = false
      this.totalResults = ''
      this.theMovie = {}
    },
    async searchMovies(payload) {
      if (this.loading) return

      this.message = ''
      this.loading = true

      try {
        const response = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = response.data
        this.movies = _uniqBy(Search, 'imdbID')
        this.totalResults = totalResults
        this.message = `success fetech data ${totalResults} !!`
        console.log(totalResults, typeof totalResults)

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가요청 전송
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) break
            // const response = await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
            const response = await _fetchMovie({
              ...payload,
              page: page
            })
            const { Search } = response.data
            //context.commit('updateState', {
            //   movies: [...context.state.movies, ..._uniqBy(Search, 'imdbID')]
            // })
            this.movies = [...this.movies, ..._uniqBy(Search, 'imdbID')]
          }
        }
      } catch (message) {
        console.log('Error(searchMovie)', message)
        this.resetMovies()
        this.message = message
      } finally {
        this.loading = false
      }
    }
  }
})

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '9cd161fb'

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
  console.log(`_fetchMovie >>>>> ${url}`)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url)
      if (response.data.Error) {
        reject(response.data.Error)
      }
      resolve(response)
    } catch (error) {
      // console.log(error.message)
      reject(error.message)
    }
  })
}
