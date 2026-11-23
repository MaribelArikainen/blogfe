<script setup>
import { usePostsStore } from '~/store/posts';

const postsStore = usePostsStore();
postsStore.clearErrors();
const route = useRoute();
const router = useRouter();
let formData = ref(null);

onMounted(async () => {
    await postsStore.getMyPost(route.params.id);
    formData.value = {
        title: postsStore.myPost.title,
        body: postsStore.myPost.body,
    };
});

async function update() {
    await postsStore.updatePost(route.params.id, formData.value);
    if (!postsStore.errors) {
        router.push('/admin/posts');
    }
}
</script>

<template>
    <div>
        <UPageCard v-if="formData" class="mt-3" title="Edit Post">
            <UFormField label="Title" :error="postsStore.errors?.title?.find(() => true)">
                <UInput v-model="formData.title" class="w-full" placeholder="Title" />
            </UFormField>
            <UFormField label="Content" :error="postsStore.errors?.body?.find(() => true)">
                <UTextarea v-model="formData.body" class="w-full" :rows="12" placeholder="Content" />
            </UFormField>
            <UButton block @click="update">Update</UButton>
        </UPageCard>
    </div>
</template>
