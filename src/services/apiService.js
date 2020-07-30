import axios from 'axios';
export  class ApiService {
    constructor(){
        this.baseUrl='http://imdbapp.mediabuy.pro'
    }
    async getMovies(){
        var response = await axios.get(this.baseUrl +'/movies')
        console.log(response)
        return response.data
    }
    async getmoviesbyId(id){
        var response = await axios.get(this.baseUrl +'/movies/'+id)
        console.log(response)
        return response.data
    }
    async addMovie(addMovieData){
        var response = await axios.post(this.baseUrl+'/movies', addMovieData)
        return response.data
    }
    async editMovie(editMovieData){
        var response = await axios.put(this.baseUrl+'/movies/'+editMovieData.Id, editMovieData )
        return response.data
    }

    async getActors(){
        var response = await axios.get(this.baseUrl+'/actors')
        return response.data
    }
    async addActor(actorData){
        var response = await axios.post(this.baseUrl +'/actors', actorData)
        return response.data
    }

    async getProducers(){
        var response = await axios.get(this.baseUrl+'/producers')
        return response.data
    }
    async addProducer(producerData){
        var response = await axios.post(this.baseUrl +'/producers', producerData)
        return response.data
    }
}
