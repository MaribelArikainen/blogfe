import axios from "axios"
export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    pagination: null as any,
    posts: [] as any[],
    post: null as any,
    myPagination: null as any,
    myPosts: [] as any[],
    myPost: null as any,
    errors: null as any,
  }),
  actions: {
    clearErrors() {
      this.errors = null;
    },
    async getPosts(page: number) {
      let res = await axios.get('http://localhost:8000/api/posts', {
        params: {
          page
        }
      });
      this.pagination = res.data;
      this.posts = res.data.data;
    },
    async getPost(id: string) {
      let res = await axios.get('http://localhost:8000/api/post/' + id);
      this.post = res.data;
    },
    async getMyPosts(page: number) {
      let res = await axios.get('http://localhost:8000/api/admin/posts', {
        params: {
          page
        }
      });
      this.myPagination = res.data;
      this.myPosts = res.data.data;
    },
    async getMyPost(id: string) {
      let res = await axios.get('http://localhost:8000/api/admin/posts/' + id);
      this.myPost = res.data;
    },
    async createPost({ title, body }: any) {
      try {
        await axios.post('http://localhost:8000/api/admin/posts', {
          title,
          body
        });
        this.errors = null;
      } catch (err: any) {
        this.errors = err.response?.data?.errors ?? { title: ['Something went wrong'] };
      }
    },
    async updatePost(id: string, { title, body }: any) {
      try {
        await axios.patch('http://localhost:8000/api/admin/posts/' + id, {
          title,
          body
        });
        this.errors = null;
      } catch (err: any) {
        this.errors = err.response?.data?.errors ?? { title: ['Something went wrong'] };
      }
    },
    async deletePost(id: string) {
      await axios.delete('http://localhost:8000/api/admin/posts/' + id);
    }
  },
})
