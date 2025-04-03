<template>
  <v-skeleton-loader v-if='isLoading' type='table'></v-skeleton-loader>
  <v-data-table v-else :items="filteredPosts" :headers="headers">
    <template v-slot:item.details="{ item }">
      <v-btn @click="getDetails(item.id)">
        Details
      </v-btn>
    </template>
    <template v-slot:item.favorites="{ item }">
      <v-checkbox color="success" @click="handleFavorites(item.id)" v-model="item.favorite"></v-checkbox>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import apiClient from '~/utils/axios';

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
  author: string,
  favorite: boolean
}

const author = defineModel<string>('author', { default: '' });
const title = defineModel<string>('title', { default: '' });
const dialog = defineModel<boolean>('dialog', { default: false });
const details = defineModel('details', {
  default: {
    title: '',
    author: '',
    body: ''
  }
})

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Author', value: 'author' },
  { title: 'Publication', value: 'body' },
  { title: 'Details', key: 'details' },
  { title: 'Favorites', key: 'favorites' }
]


const posts = ref<Post[]>([]);
const users = ref<{ id: number; name: string }[]>([]);
const isLoading = ref(true);

async function getPosts() {
  // try {

  //   const postsResponse = await apiClient.get("/posts");

  //   const usersResponse = await apiClient.get("/users");
  //   users.value = usersResponse.data;

  //   posts.value = postsResponse.data.map((post: any) => {
  //     const user = users.value.find(u => u.id === post.userId);
  //     return {
  //       ...post,
  //       author: user ? user.name : 'Desconocido'
  //     }
  //   });

  //   await nextTick();

  //   fillFavorites();

  // } catch (error) {
  //   console.log('Error en conseguir los posts', error);
  // } finally {
  //   isLoading.value = false;
  // }

  const postsResponse = await apiClient.get("/posts");

  const usersResponse = await apiClient.get("/users");

  if (postsResponse.status === 200 && usersResponse.status === 200) {
    users.value = usersResponse.data;

    posts.value = postsResponse.data.map((post: Post) => {
      const user = users.value.find(u => u.id === post.userId);
      return {
        ...post,
        author: user ? user.name : 'Desconocido'
      }
    });

    await nextTick();

    fillFavorites();
    isLoading.value = false;
  }
}

getPosts();

const filteredPosts = computed(() => {
  return posts.value.filter((p) => p.title.includes(title.value) && p.author.toLowerCase().includes(author.value.toLowerCase()))
})


async function getDetails(postId: number) {
  const found = posts.value.find(post => post.id === postId) || { title: '', body: '', author: '', userId: 0 };
  details.value = { title: found.title, body: found.body, author: "Cargando..." };

  // try {
  //   const authorData = await apiClient.get(`/users/${found.userId}`);
  //   details.value.author = authorData.data.name;
  // } catch {
  //   details.value.author = "Desconocido";
  //   // errStore.setValues('Unknown author', 'The author couldnt be found');
  //   // errStore.openDialog();
  // }

  const authorData = await apiClient.get(`/users/${found.userId}`);
  if (authorData.status === 200) {
    details.value = { title: found.title, body: found.body, author: authorData.data.name };
    dialog.value = true;
  }
}

function handleFavorites(id: number) {

  if (typeof window === 'undefined') return;

  const storaged = localStorage.getItem("favoritePosts");
  let favoritePosts: number[] = [];
  try {
    favoritePosts = storaged ? JSON.parse(storaged) : [];
    if (!Array.isArray(favoritePosts)) {
      throw new Error("Parsed value is not an array");
    }
  } catch (error) {
    console.error("Error parsing favoritePosts:", error);
    favoritePosts = [];
  }
  const foundIndex = favoritePosts.findIndex(p => p === id);

  if (foundIndex > -1) {
    favoritePosts.splice(foundIndex, 1)
  } else {
    favoritePosts.push(id)
  }

  localStorage.setItem("favoritePosts", JSON.stringify(favoritePosts));

  const postIndex = posts.value.findIndex(p => p.id === id);
  posts.value[postIndex].favorite = !posts.value[postIndex].favorite;

}

function fillFavorites() {
  if (typeof window === 'undefined') return;
  const storaged = localStorage.getItem("favoritePosts");
  const favoritePostsIds: number[] = storaged ? JSON.parse(storaged) : [];

  if (favoritePostsIds.length > 0) {
    favoritePostsIds.map((id) => {
      const postIndex = posts.value.findIndex(p => p.id === id);
      posts.value[postIndex].favorite = true;
    })
  }

}


</script>