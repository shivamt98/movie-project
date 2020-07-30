<template>
  <div>
      <Icon type="ios-add-circle" size="30" @click="modalShow = true " />
    <Modal
        v-model="modalShow"
        title="Common Modal dialog box title"
        @on-ok="submit('person')">
    <Form ref="person" :model="person" :rules="ruleValidate" :label-width="80">
      <FormItem label="Name" prop="name">
        <Input v-model="person.name" placeholder="Enter Name" />
      </FormItem>
      <FormItem label="DateOfBirth" prop="dateOfBirth">
        <Row>
          <Col span="11">
            <DatePicker type="date" placeholder="Select date" v-model="person.dateOfBirth"></DatePicker>
            <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Company" v-if="type==1 ? !seen : seen" prop="company">
        <Input v-model="person.company" placeholder="Enter Company Name" :disabled="type==1"/>
      </FormItem>
      <FormItem label="Text" prop="bio">
        <Input
          v-model="person.bio"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter BIO"

        />
      </FormItem>
      <FormItem label="Radio" prop="sex">
        <RadioGroup v-model="person.sex">
          <Radio label="Male" >Male</Radio>
          <Radio label="Female">Female</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    </Modal>
  </div>
</template>
<script>
import { ApiService } from "@/services/apiService.js";
export default {
  props: ["type"],
  data() {
    return {
      modalShow: false,
      seen: true,
      person: {
        name: "",
        dateOfBirth: "",
        company: "",
        bio: "",
        sex: ""
      },
      ruleValidate: {
          name:[{required: true, message: 'The name cannot be empty', trigger: 'blur'}],
          dateOfBirth:[{required: true, message: 'Please select the date', trigger: 'change', type:'date'}],
          company:[{required: true, message: 'The company cannot be empty', trigger: 'blur'}],
          bio:[{required: true, message: 'The movie bio cannot be empty', trigger: 'blur'}],
          sex:[{required: true, message: 'Please select gender', trigger: 'change'}],
      },
      newProducer: {
        name: "",
        dateOfBirth: "",
        company: "",
        bio: "",
        sex: ""
      }
    };
  },
  methods: {

    async submit(name){
        this.$refs[name].validate(async (valid) => {
        if (valid) {
            var apiService = new ApiService();
        if(this.type==1){
            var id = await apiService.addActor(this.person);
            var newPerson = {
            id: id,
            name: this.person.name
            };
            this.$emit("submitdata", newPerson);
        }else{
            this.newProducer.name = this.person.name;
            this.newProducer.dateOfBirth = this.person.dateOfBirth;
            this.newProducer.company = this.person.company;
            this.newProducer.bio = this.person.bio;
            if (this.person.sex == "Male") {
                this.newProducer.sex = 0;
            } else {
                this.newProducer.sex = 1;
            }
                 id = await apiService.addProducer(this.newProducer);
                 newPerson = {
                id: id,
                name: this.person.name
            };
            this.$emit("submitdata", newPerson);
          }

        } else {
            this.$Message.error('Fail!');
        }
    })
    },
  }
};
</script>
