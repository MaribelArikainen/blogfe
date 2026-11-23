<script setup>
import { usePostsStore } from '~/store/posts';
let router = useRouter();
let route = useRoute();
let postsStore = usePostsStore();

let page = ref(parseInt(route.query.page ?? 1));

onMounted(() => {
    postsStore.getPosts(page.value);
});

async function to(page) {
    router.push({
        query: {
            page: page
        }
    });
    await postsStore.getPosts(page);
}
</script>

<template>
    <div>
        <UPagination v-if="postsStore.pagination" class="my-4 flex justify-center" v-model:page="page" @update:page="to" show-edges :sibling-count="2" :items-per-page="postsStore.pagination.per_page" :total="postsStore.pagination.total" />
        <UPageColumns>
            <PostCard v-for="post in postsStore.posts" :key="post.id" :post="post" :snippet="true"></PostCard>
        </UPageColumns>
    </div>
</template>
