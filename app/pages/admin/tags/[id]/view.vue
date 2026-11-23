<script setup>
import { useTagsStore } from '~/store/tags';

const tagsStore = useTagsStore();
const route = useRoute();

onMounted(() => {
    tagsStore.getTag(route.params.id);
});

let rows = computed(() => {
    let tag = tagsStore.tag;
    if (!tag || tag.id != route.params.id) {
        return [];
    }
    return [
        {
            name: 'ID',
            value: tag.id
        },
        {
            name: 'Name',
            value: tag.name
        },
        {
            name: 'Posts',
            value: tag.posts_count
        },
        {
            name: 'Created',
            value: tag.created_at
        },
        {
            name: 'Updated',
            value: tag.updated_at
        }
    ];
});
</script>

<template>
    <div>
        <UButton class="my-2" to="/admin/tags" variant="outline">Back</UButton>
        <UPageList>
            <UPageCard class="rounded-none" v-for="row in rows" :key="row.name">
                <template #body>
                    <UUser :name="row.name" :description="String(row.value ?? '')" size="xl" class="relative" />
                </template>
            </UPageCard>
        </UPageList>
    </div>
</template>
