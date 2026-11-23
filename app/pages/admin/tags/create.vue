<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
tagsStore.clearErrors();
const router = useRouter();
let formData = ref({
    name: '',
});
async function create() {
    await tagsStore.createTag(formData.value);
    if (!tagsStore.errors) {
        router.push('/admin/tags');
    }
}
</script>

<template>
    <div>
        <UPageCard class="mt-3" title="New Tag">
            <UFormField label="Name" :error="tagsStore.errors?.name?.find(() => true)">
                <UInput v-model="formData.name" class="w-full" placeholder="Name" />
            </UFormField>
            <UButton block @click="create">Create</UButton>
        </UPageCard>
    </div>
</template>
