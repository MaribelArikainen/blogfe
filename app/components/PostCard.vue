<script setup>
defineProps(['post', 'snippet']);
</script>
<template>
  <UBlogPost
    :title="post.title"
    :authors="[{ name: post.user.name }]"
    :description="snippet ? post.snippet : post.body"
    :date="new Date(post.created_at).toLocaleDateString()"
    :to="'/post/' + post.id"></UBlogPost>
</template>
