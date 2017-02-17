<template>
  <ol class="breadcrumb">
    <slot></slot>
  </ol>
</template>

<script>
  export default {
    name: 'WyBreadcrumb'
  }
</script>

<style>
  .breadcrumb {
    padding: 8px 20px;
    list-style: none;
    background-color: transparent
  }

  .breadcrumb>li+li:before {
    content: "/\00a0";
    padding: 0 5px;
    color: #ccc
  }

  .breadcrumb :last-child {
    color: #7c7c7c;
    cursor: default
  }

  .breadcrumb {
    border-bottom: 1px solid #E5E5E5;
    border-radius: 0;
    /*margin-bottom: 50px*/
  }

  @media (min-width:1280px) {
    .breadcrumb {
      padding: 10px 33px 11px 300px
    }
  }

  @media (max-width:1279px) {
    .breadcrumb {
      padding: 10px 33px 11px
    }
  }

  .breadcrumb>li {
    color: #5E5E5E;
    cursor: pointer
  }

  .breadcrumb>li:hover {
    color: #7c7c7c
  }

  .breadcrumb>li {
    display: inline-block
  }
</style>
