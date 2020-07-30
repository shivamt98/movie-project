<template>
  <div>
    <MovieList/>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'Home',
  components: {
    MovieList
  }
}
</script>
