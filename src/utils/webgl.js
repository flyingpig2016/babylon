(function () {
  window.BMAP_PROTOCOL = "https";
  window.BMapGL_loadScriptTime = (new Date).getTime();
  document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ&services=&t=20240906151558"></script>');
  document.write('<link rel="stylesheet" type="text/css" href="https://api.map.baidu.com/res/webgl/10/bmap.css"/>');
})();