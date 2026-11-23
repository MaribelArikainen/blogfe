<script setup>
import { usePostsStore } from '~/store/posts';
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
let router = useRouter();
let route = useRoute();
let postsStore = usePostsStore();

let page = ref(parseInt(route.query.page ?? 1));

onMounted(() => {
    postsStore.getMyPosts(page.value);
});

async function to(page) {
    router.push({
        query: {
            page: page
        }
    });
    await postsStore.getMyPosts(page);
}

let columns = [
    {
        accessorKey: 'id',
        header: '#',
        cell: (cell) => '#' + cell.getValue()
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'created_at',
        header: 'Created',
    },
    {
        accessorKey: 'updated_at',
        header: 'Updated',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right' },
                h(
                    UDropdownMenu,
                    {
                        content: {
                            align: 'end'
                        },
                        items: getRowItems(row),
                        'aria-label': 'Actions dropdown'
                    },
                    () =>
                        h(UButton, {
                            icon: 'i-lucide-ellipsis-vertical',
                            color: 'neutral',
                            variant: 'ghost',
                            class: 'ml-auto',
                            'aria-label': 'Actions dropdown'
                        })
                )
            )
        }
    }
];

function getRowItems(row) {
    return [
        {
            label: 'View',
            to: `/admin/posts/${row.original.id}/view`
        },
        {
            label: 'Edit',
            to: `/admin/posts/${row.original.id}/edit`
        },
        {
            label: 'Delete',
            color: 'error',
            async onSelect() {
                await postsStore.deletePost(row.original.id);
                await postsStore.getMyPosts(page.value);
            }
        },
    ]
}
</script>

<template>
    <div>
        <UButton class="my-2" to="/admin/posts/create">Create</UButton>
        <UPagination v-if="postsStore.myPagination" class="my-4 flex justify-center" v-model:page="page" @update:page="to" show-edges :sibling-count="2" :items-per-page="postsStore.myPagination.per_page" :total="postsStore.myPagination.total" />
        <UTable :data="postsStore.myPosts" :columns="columns" class="flex-1" />
    </div>
</template>
