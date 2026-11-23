<script setup>
import { usePostsStore } from '~/store/posts';

const postsStore = usePostsStore();
const route = useRoute();

onMounted(() => {
    postsStore.getMyPost(route.params.id);
});

let rows = computed(() => {
    let post = postsStore.myPost;
    if (!post || post.id != route.params.id) {
        return [];
    }
    return [
        {
            name: 'ID',
            value: post.id
        },
        {
            name: 'Title',
            value: post.title
        },
        {
            name: 'Content',
            value: post.body
        },
        {
            name: 'Created',
            value: post.created_at
        },
        {
            name: 'Updated',
            value: post.updated_at
        }
    ];
});
</script>

<template>
    <div>
        <UButton class="my-2" to="/admin/posts" variant="outline">Back</UButton>
        <UPageList>
            <UPageCard class="rounded-none" v-for="row in rows" :key="row.name">
                <template #body>
                    <UUser :name="row.name" :description="String(row.value ?? '')" size="xl" class="relative" />
                </template>
            </UPageCard>
        </UPageList>
    </div>
</template>
