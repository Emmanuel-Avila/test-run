import {reactive} from 'vue';

export const errStore = reactive({
  title: '',
  description: '',
  setValues(title: string, description: string){
    this.title = title;
    this.description = description;
  }
})