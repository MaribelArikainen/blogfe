import axios from "axios"
export const useTagsStore = defineStore('tagsStore', {
  state: () => ({
    pagination: null as any,
    tags: [] as any[],
    tag: null as any,
    errors: null as any,
  }),
  actions: {
    clearErrors() {
      this.errors = null;
    },
    async getTags(page: number) {
      let res = await axios.get('http://localhost:8000/api/admin/tags', {
        params: {
          page
        }
      });
      this.pagination = res.data;
      this.tags = res.data.data;
    },
    async getTag(id: string) {
      let res = await axios.get('http://localhost:8000/api/admin/tags/' + id);
      this.tag = res.data;
    },
    async createTag({ name }: any) {
      try {
        await axios.post('http://localhost:8000/api/admin/tags', {
          name
        });
        this.errors = null;
      } catch (err: any) {
        this.errors = err.response?.data?.errors ?? { name: ['Something went wrong'] };
      }
    },
    async updateTag(id: string, { name }: any) {
      try {
        await axios.patch('http://localhost:8000/api/admin/tags/' + id, {
          name
        });
        this.errors = null;
      } catch (err: any) {
        this.errors = err.response?.data?.errors ?? { name: ['Something went wrong'] };
      }
    },
    async deleteTag(id: string) {
      await axios.delete('http://localhost:8000/api/admin/tags/' + id);
    }
  },
})
