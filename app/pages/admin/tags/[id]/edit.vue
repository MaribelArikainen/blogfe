<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
tagsStore.clearErrors();
const route = useRoute();
const router = useRouter();
let formData = ref(null);

onMounted(async () => {
    await tagsStore.getTag(route.params.id);
    formData.value = {
        name: tagsStore.tag.name,
    };
});

async function update() {
    await tagsStore.updateTag(route.params.id, formData.value);
    if (!tagsStore.errors) {
        router.push('/admin/tags');
    }
}
</script>

<template>
    <div>
        <UPageCard v-if="formData" class="mt-3" title="Edit Tag">
            <UFormField label="Name" :error="tagsStore.errors?.name?.find(() => true)">
                <UInput v-model="formData.name" class="w-full" placeholder="Name" />
            </UFormField>
            <UButton block @click="update">Update</UButton>
        </UPageCard>
    </div>
</template>
