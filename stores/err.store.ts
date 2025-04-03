import {reactive} from 'vue';

export const errStore = reactive({
  title: '',
  description: '',
  open: false,
})

export function setErrValues(title: string, description: string){
  errStore.title = title;
  errStore.description = description;
}

export function openDialog(){
  errStore.open = true;
}

export function closeDialog() {
  errStore.open = false
}