<template>
  <div class="formEdit">
    <Form ref="movie" :model="movie" :rules="ruleValidate" :label-width="80">
      <FormItem label="Movie Name" prop="Name">
        <Input v-model="movie.Name" placeholder="Enter Movie Name" />
      </FormItem>

      <FormItem label="Actor Name" prop="ActorIds">
        <Select v-model="movie.ActorIds" multiple placeholder="select actor">
          <Option
            v-for="(actorDetails) in actor"
            :key="actorDetails.id"
            :value="actorDetails.id"
          >{{actorDetails.name}}</Option>
        </Select>
        <PersonDetails :type="1" @submitdata="updateActorDetails" />
      </FormItem>

      <FormItem label="Producer Name" prop="ProducerId">
        <Select v-model="movie.ProducerId" placeholder="select producer" id="prd1">
          <Option
            v-for="(producerDetails) in producer"
            :key="producerDetails.id"
            :value="producerDetails.id"
          >{{producerDetails.name}}</Option>
        </Select>
        <PersonDetails :type="0" @submitdata="updateProducerDetails" />
      </FormItem>

      <FormItem label="Movie Plot" prop="Plot">
        <Input
          v-model="movie.Plot"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Movie Plot"
          required
        />
      </FormItem>

      <FormItem label="ReleaseDate" prop="DateOfRelease">
        <Row>
          <Col span="3">
            <DatePicker type="date" placeholder="Select date" v-model="movie.DateOfRelease"></DatePicker>
            <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Col>
        </Row>
      </FormItem>
      <Button type="warning" @click.prevent="submitData('movie')">Submit</Button>
    </Form>
  </div>
</template>

<script>
import PersonDetails from "@/components/PersonDetails.vue";
import { ApiService } from "@/services/apiService.js";
export default {
  name: "movieForm",
  props: ["movieid"],
  data() {
    return {
      type: 0,
      actor: [],
      producer: [],

      movie: {
        Id: 0,
        Name: "",
        ActorIds: [],
        ProducerId: "",
        Plot: "",
        DateOfRelease: "",
      },
      ruleValidate: {
        Name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        ActorIds: [
          {
            required: true,
            message: "Please select the Actor",
            trigger: "change",
            type: "array",
          },
        ],
        ProducerId: [
          {
            required: true,
            message: "Please select the Producer",
            trigger: "change",
            type: "number",
          },
        ],
        Plot: [
          {
            required: true,
            message: "Please enter a movie Plot",
            trigger: "blur",
          },
        ],
        DateOfRelease: [
          {
            required: true,
            message: "Please enter movie release date",
            trigger: "blur",
            type: "date",
          },
        ],
      },
    };
  },
  components: {
    PersonDetails,
  },
  async created() {
    var apiService = new ApiService();
    if (this.movieid) {
      this.actor = await apiService.getActors();
      this.producer = await apiService.getProducers();
      var movieDetailsById = await apiService.getmoviesbyId(this.movieid);

      this.movie.Id = movieDetailsById.Id;
      this.movie.Name = movieDetailsById.Name;
      this.movie.Plot = movieDetailsById.Plot;
      this.movie.DateOfRelease = movieDetailsById.DateOfRelease;
      this.movie.ProducerId = movieDetailsById.Producer.Id;

      for (var i = 0; i < movieDetailsById.Actors.length; i++) {
        this.movie.ActorIds.push(movieDetailsById.Actors[i].Id);
      }
    } else {
      this.actor = await apiService.getActors();
      this.producer = await apiService.getProducers();
    }
  },
  methods: {
    async submitData(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          var apiService = new ApiService();
          if (this.movieid) {
            await apiService.editMovie(this.movie);
          } else {
            await apiService.addMovie(this.movie);
          }
          this.$router.push("/");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    updateActorDetails(value) {
      this.showActorModal = false;
      this.actor.push(value);
      this.movie.ActorIds.push(value.id);
    },
    updateProducerDetails(value) {
      this.showProducerModal = false;
      this.producer.push(value);
      this.movie.ProducerId = value.id;
    },
  },
};
</script>

<style scoped>
.ivu-modal-footer {
  display: none;
}
</style>