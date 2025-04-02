<template>
  <v-container>
    <v-btn @click='clearLocalStorage'>Clear local</v-btn>
    <Filter v-model:author="author" v-model:title="title"></Filter>
    <v-skeleton-loader v-if='isLoading' type='table'></v-skeleton-loader>
    <v-data-table v-else :items='filteredPosts' :headers='headers'>
      <template v-slot:item.details="{ item }">
        <v-btn @click="getDetails(item.id)">
          Details
        </v-btn>
      </template>
      <template v-slot:item.favorites="{ item }">
        <v-checkbox color="success" @click="handleFavorites(item.id)" v-model="item.favorite"></v-checkbox>
      </template>
    </v-data-table>
  </v-container>
  <Details v-model:dialog="dialog" v-model:details="details"></Details>
  <!-- <v-dialog v-model="dialog" max-width='500'>
    <v-card title="Details">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="details.author" label="Author" disabled></v-text-field>
        </v-col>
        <v-col cols='12'>
          <v-text-field v-model="details.title" label="Title" disabled></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="details.body" label="Body" disabled></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog> -->
</template>



<script setup lang="ts">
import axios from 'axios';
import { errStore } from '~/stores/err.store';
import Filter from '~/components/Filter.vue';

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
  author: string,
  favorite: boolean
}

const DEFAULT_DETAILS = {
  title: '',
  author: '',
  body: ''
}

const author = ref('');
const title = ref('');
const isLoading = ref(true);
const dialog = ref(false);
const posts = ref<Post[]>([]);
const users = ref<{ id: number; name: string }[]>([]);
const details = ref(DEFAULT_DETAILS);


axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  errStore.setValues('Error', error.message)
  return Promise.reject(error);
})

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Author', value: 'author' },
  { title: 'Publication', value: 'body' },
  { title: 'Details', key: 'details' },
  { title: 'Favorites', key: 'favorites' }
]

const filteredPosts = computed(() => {
  return posts.value.filter((p) => p.title.includes(title.value) && p.author.toLowerCase().includes(author.value.toLowerCase()))
})

async function getPosts() {
  try {

    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');

    const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
    users.value = usersResponse.data;

    posts.value = postsResponse.data.map((post: any) => {
      const user = users.value.find(u => u.id === post.userId);
      return {
        ...post,
        author: user ? user.name : 'Desconocido'
      }
    });

    await nextTick();

    fillFavorites();

  } catch (error) {
    console.log('Error en conseguir los posts', error);
  } finally {
    isLoading.value = false;
  }
}

getPosts();


async function getDetails(postId: number) {
  const found = posts.value.find(post => post.id === postId) || { title: '', body: '', author: '', userId: 0 };
  details.value = { title: found.title, body: found.body, author: "Cargando..." };

  try {
    const authorData = await getAuthor(found.userId);
    details.value.author = authorData.name;
  } catch {
    details.value.author = "Desconocido";
  }

  dialog.value = true;
}


async function getAuthor(id: number) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error en conseguir el autor", error);
    return { name: "Desconocido" };
  }
}

function handleFavorites(id: number) {

  if (typeof window !== 'undefined') {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const storaged = localStorage.getItem("favoritePosts");
    const favoritePosts: Record<number, boolean> = storaged ? JSON.parse(storaged) : {};
    favoritePosts[id] = favoritePosts.hasOwnProperty(id) ? !favoritePosts[id] : true;

    localStorage.setItem("favoritePosts", JSON.stringify(favoritePosts));

    const foundIndex = posts.value.findIndex(p => p.id === id);
    posts.value[foundIndex].favorite = !posts.value[foundIndex].favorite;

    console.log(favoritePosts)
  }
}

function fillFavorites() {
  if (typeof window !== 'undefined') {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storaged = localStorage.getItem("favoritePosts");
    const favoritePosts: Record<number, boolean> = storaged ? JSON.parse(storaged) : {};

    if (favoritePosts) {
      const keys = Object.keys(favoritePosts);

      keys.map((k) => {
        if (favoritePosts[parseInt(k)]) {
          const foundIndex = posts.value.findIndex(p => p.id === parseInt(k))
          posts.value[foundIndex].favorite = !posts.value[foundIndex].favorite;
        }
      })
    }
  }
}

function clearLocalStorage() {
  localStorage.setItem("favoritePosts", "");
  console.log(localStorage.getItem("favoritePosts"));
}

</script>