<template>
  <footer id="footer">
    Copyright &copy; 2017 纬课教育
    <ul class="f-menu">
      <li><a href="#">主页</a></li>
      <li><a href="#">报告</a></li>
      <li><a href="#">联系</a></li>
    </ul>
  </footer>
</template>

<style scoped>
  #footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 110px;
    padding-top: 35px;
    padding-bottom: 15px
  }

  #footer .f-menu {
    display: block;
    width: 100%;
    padding-left: 0;
    list-style: none;
    margin-left: -5px;
    margin-top: 8px
  }

  #footer,
  #footer .f-menu>li>a {
    color: #a2a2a2
  }

  #footer .f-menu>li>a:hover {
    color: #777
  }

  #footer .f-menu>li {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px
  }

  @media (min-width:1280px) {
    #footer {
      padding-left: 268px
    }
  }

  @media print {
    #footer {
      display: none!important
    }
  }
</style>
