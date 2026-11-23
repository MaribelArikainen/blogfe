<script setup>
import { usePostsStore } from '~/store/posts';
let route = useRoute();
let postsStore = usePostsStore();

onMounted(() => {
    postsStore.getPost(route.params.id);
});
</script>

<template>
    <div>
        <PostCard v-if="postsStore.post?.id == route.params.id" class="mt-3" :post="postsStore.post"></PostCard>
    </div>
</template>
