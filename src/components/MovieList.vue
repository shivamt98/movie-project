<template>
  <div >
    <div>
    <h3 id="head1">Explore What's Streaming</h3>
    </div>
    <Button type="primary" @click="$router.push('addMovie')" >Add Movie</Button>
    <br />
    <br />
    <div v-for="(movie) in movies" :key="movie.Id">
    
          <Col :xs="24" :sm="12" :md="12" :lg="8" class="col" >
          <img :src="movie.PosterURL ? movie.PosterURL : 'no-poster-available.jpg'" @error="setAltImg" @click="$router.push({name:'editMovie', params:{id:movie.Id}})" />
          <br />
          {{movie.Name}}<br />
          {{movie.Producer.Name}}<br />
          <div v-for="(actor) in movie.Actors" :key="actor.Id">{{actor.Name}}</div>
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Col>

    </div>
  </div>
</template>

<script>
import {ApiService} from '@/services/apiService.js'
export default {
  name:"movieList",
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    var apiService = new ApiService()
    this.movies = await apiService.getMovies()
  },
  methods:{
    setAltImg(event){
      event.target.src="no-poster-available.jpg"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 185px;
  height: 278px;
}
.col {
  height: 500px;
}
#head1 {
    text-align: center;
    color: yellow;
    padding-bottom: 10px;
    font-size: 20px;
}
#Button1 {
  text-align:left;
  padding-left: 161px;
}

</style>
