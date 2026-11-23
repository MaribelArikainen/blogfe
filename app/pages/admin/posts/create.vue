<script setup>
import { usePostsStore } from '~/store/posts';

const postsStore = usePostsStore();
postsStore.clearErrors();
const router = useRouter();
let formData = ref({
    title: '',
    body: '',
});
async function create() {
    await postsStore.createPost(formData.value);
    if (!postsStore.errors) {
        router.push('/admin/posts');
    }
}
</script>

<template>
    <div>
        <UPageCard class="mt-3" title="New Post">
            <UFormField label="Title" :error="postsStore.errors?.title?.find(() => true)">
                <UInput v-model="formData.title" class="w-full" placeholder="Title" />
            </UFormField>
            <UFormField label="Content" :error="postsStore.errors?.body?.find(() => true)">
                <UTextarea v-model="formData.body" class="w-full" :rows="12" placeholder="Content" />
            </UFormField>
            <UButton block @click="create">Create</UButton>
        </UPageCard>
    </div>
</template>
