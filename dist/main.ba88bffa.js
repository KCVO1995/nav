// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var storage = localStorage.getItem('storage');
var storageObject = JSON.parse(storage);
var $input = $('input');
var $choiceBtn = $('.choiceBtn');
var $bigBox = $('.bigBox');
var $smallBox = $(".smallBox");
var $form = $('.searchForm');
var $globalMain = $('.globalMain');
var body = document.getElementsByTagName('body')[0];
var hashMap = storageObject || [{
  logo: 'a',
  url: "https://www.acfun.cn"
}, {
  logo: 'b',
  url: "https://www.baidu.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ''); // 删除 / 后面的内容
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li> \n            <div class=\"close\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>              \n                <a href= \"".concat(node.url, "\" >\n                        <div class=\"site\">\n                            <div class=\"logo\">").concat(node.logo, "</div>\n                            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>    \n                        </div>\n                </a>\n        </li>")).insertBefore($lastLi);
    $li.on('click', '.close', function (e) {
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = prompt('请问你要添加我网址是啥');

  if (url === '') {
    alert("请输入正确的网站");
    return null;
  } else if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('storage', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;
  hashMap.forEach(function (node) {
    if (node.logo === key) {
      window.open(node.url);
    }
  });
}); // 阻止input框的冒泡

$input.on('keypress', function (e) {
  e.stopPropagation();
}); // 电脑端搜索框显示默认语句

var isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice === false) {
  $input.attr('placeholder', "在搜索框内按tab，可以换搜索引擎哟");
} // 切换搜索引擎


$(document).ready(function () {
  var index = localStorage.getItem('searchBox') || 0;
  var searchTypes = [{
    name: 'wd',
    action: 'https://www.baidu.com/s',
    img: 'baidu.705500cf.png',
    type: 'baidu'
  }, {
    name: 'q',
    action: 'https://www.google.com/search',
    img: 'google.953ec577.png',
    type: 'google'
  }, {
    name: 'q',
    action: 'https://cn.bing.com/search',
    img: 'bing.4d496f25.png',
    type: 'bing'
  }, {
    name: 'query',
    action: 'https://www.sogou.com/web',
    img: 'sougou.698e3fe0.png',
    type: 'sougou'
  }]; // 点击切换出现隐藏框

  $choiceBtn.on('click', function () {
    $bigBox.css({
      "display": "block",
      height: 0
    });
    $bigBox.animate({
      height: $smallBox.height() * $smallBox.length
    }, 300);
  }); // 显示搜索引擎

  var searchBox = function searchBox(index) {
    $form.attr("action", searchTypes[index].action);
    $input.attr('name', searchTypes[index].name);
    $choiceBtn.find('img').attr('src', searchTypes[index].img);
  }; // 初始化搜索引擎，是上一次的选择


  searchBox(index); // 可以用e.currentTarget 遍历bigBox的子元素，看谁被触发了事件
  // Tab键切换搜索引擎

  $input.on('keydown', function (e) {
    if (e.key === 'tab' || e.keyCode === 9) {
      e.stopPropagation();
      e.preventDefault();

      if (index < searchTypes.length - 1) {
        index++;
      } else {
        index = 0;
      }

      localStorage.setItem('searchBox', index);
      searchBox(index);
    }
  }); // 点击bigBox 切换搜索引擎

  $bigBox.on('click', 'div', function (e) {
    var $box = $(e.currentTarget);
    index = $box.index();
    localStorage.setItem('searchBox', index);
    searchBox(index);
    $bigBox.animate({
      height: 0
    }, 300, function () {
      $bigBox.css({
        "display": "none",
        height: 0
      });
    });
  });
});
$bigBox.mouseleave(function () {
  $bigBox.animate({
    height: 0
  }, 300, function () {
    $bigBox.css({
      "display": "none",
      height: 0
    });
  });
}); // siteList 下划隐藏

function onMouseWheel(e) {
  /*当鼠标滚轮事件发生时，执行一些操作*/
  var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作

  down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;

  if (down) {
    $globalMain.removeClass('in').addClass('out');
  } else {
    $globalMain.removeClass('out').addClass('in');
  }

  if (e.preventDefault) {
    /*FF 和 Chrome*/
    e.preventDefault(); // 阻止默认事件
  }

  return false;
}

addEvent(body, 'mousewheel', onMouseWheel);
addEvent(body, 'DOMMouseScroll', onMouseWheel);

function addEvent(obj, xEvent, fn) {
  if (obj.attachEvent) {
    obj.attachEvent('on' + xEvent, fn);
  } else {
    obj.addEventListener(xEvent, fn, {
      passive: false
    });
  }
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.ba88bffa.js.map