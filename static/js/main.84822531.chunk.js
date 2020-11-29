(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{20:function(t,e,n){},21:function(t,e,n){},22:function(t,e,n){},23:function(t,e,n){},24:function(t,e,n){},25:function(t,e,n){},26:function(t,e,n){},27:function(t,e,n){},28:function(t,e,n){},29:function(t,e,n){},30:function(t,e,n){"use strict";n.r(e);var r=n(0),s=n(1),i=n.n(s),a=n(11),o=n.n(a),c=n(2),l={noOfBombs:10,rows:9,cols:8,secPerMinute:60,gameStates:["init","action","defeat","victory"],gameStateMsg:{init:"",action:"",defeat:"YOU LOST",victory:"YOU WIN"}};n(20);var d=function(t){var e=t.marked;return Object(r.jsx)("div",{className:"flagsCounter",children:String(e).padStart(3,"0").split("").join(" ")})};n(21);var u=function(t){return Object(r.jsx)("button",{type:"button",className:"resetBtn",onClick:t.myResetBtnClickHandler,children:"New"})};n(22);var h=function(t){var e=t.timeElapsed;return Object(r.jsxs)("div",{className:"timer",children:[Math.floor(e/l.secPerMinute),Object(r.jsx)("span",{children:":"}),String(e%l.secPerMinute).padStart(2,"0")]})};n(23);var f=function(t){return Object(r.jsxs)("header",{className:"ControlPanel",children:[Object(r.jsx)(d,{marked:t.marked}),Object(r.jsx)(u,{myResetBtnClickHandler:t.myResetBtnClickHandler}),Object(r.jsx)(h,{timeElapsed:t.timeElapsed})]})},m=n(9),b=n(3),v=["closed","open","marked"],I=function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"closed";Object(b.a)(this,t),this.bomb=!!e,this.state=v.includes(n)?n:"closed",this.bombsAround=0},g=n.p+"static/media/bomb1.dab46aa2.svg",j=n.p+"static/media/boom1.4d436099.svg",O=(n(24),function(t){var e=Number(t.r),n=Number(t.c),s=t.cellObj,i=t.myCellClickHandler,a="",o="",c=Object(r.jsx)("img",{src:g,className:"bomb-img",alt:"bomb","data-r":e,"data-c":n}),l=Object(r.jsx)("img",{src:j,className:"boom-img",alt:"boom","data-r":e,"data-c":n}),d=Object(r.jsx)("p",{"data-r":e,"data-c":n,children:s.bombsAround.toString()});"marked"===s.state?(a=c,o="marked"):"open"===s.state&&s.bomb?(a=l,o="open boom"):"open"!==s.state||s.bomb?(a="",o="closed"):(a=0===s.bombsAround?"":d,o="open empty");var u="cell "+o;return Object(r.jsx)("div",{className:u,"data-r":e,"data-c":n,onClick:i,onContextMenu:i,children:a})});n(25);var w=function(t){var e=t.r,n=Object(m.a)(Array(l.cols).keys()).map((function(n){var s=n.toString();return Object(r.jsx)(O,{r:e,c:s,cellObj:t.cellRow[n],myCellClickHandler:t.myCellClickHandler},"r"+e+"c"+s)}));return Object(r.jsx)("div",{className:"Row",r:e,children:n})};n(26);var N=function(t){var e=Object(m.a)(Array(l.rows).keys()).map((function(e){var n=e.toString();return Object(r.jsx)(w,{r:n,cellRow:t.cellArr[e],myCellClickHandler:t.myCellClickHandler},"r"+n)})),n=t.gameState,s=l.gameStateMsg[n],i="victory"===n?"msg win":"defeat"===n?"msg lost":"msg",a=s?Object(r.jsx)("p",{className:i,children:s}):"";return Object(r.jsxs)("main",{className:"Field",children:[e,a]})},y=n(6),C=n(12),p=n(14),k=n(13),R=function(t){Object(C.a)(n,t);var e=Object(p.a)(n);function n(t,r,s){var i;if(Object(b.a)(this,n),void 0===(this instanceof n?this.constructor:void 0))throw new Error("FieldClass constructor: not called using the 'new' operator as it should be.");return n.checkNoOfBombsParam(s),(i=e.call(this,t,r,I,!1,"closed")).noOfBombs=s,i.fillWithBombs(s),i.calculateBombsAroundAllCells(),i}return Object(y.a)(n,[{key:"resetField",value:function(){this.arr=this.initArr(I,!1,"closed"),this.fillWithBombs(this.noOfBombs),this.calculateBombsAroundAllCells()}},{key:"countBombs",value:function(){if(!this.arr)return 0;for(var t=0,e=0;e<this.rows;e++)for(var n=0;n<this.cols;n++)!0===this.arr[e][n].bomb&&t++;return t}},{key:"fillWithBombs",value:function(t){if(!this.arr||!Number.isSafeInteger(t))return!1;if(t<1||t>this.rows*this.cols)return!1;for(;this.countBombs()<t;){var e=Math.floor(Math.random()*this.rows),n=Math.floor(Math.random()*this.cols);this.arr[e][n].bomb=!0}return!0}},{key:"countBombsAround",value:function(t,e){var n=this;if(!this.arr)return 0;if(!this.isRowColInRange(t,e))return 0;var r=this.adjacency8IndexesList(t,e,!1);return r&&0!==r.length?r.filter((function(t){var e=Object(c.a)(t,2),r=e[0],s=e[1];return n.arr[r][s].bomb})).length:0}},{key:"calculateBombsAroundAllCells",value:function(){if(this.arr)for(var t=0;t<this.rows;t++)for(var e=0;e<this.cols;e++)this.arr[t][e].bombsAround=this.countBombsAround(t,e)}},{key:"isWinConditionSatisfied",value:function(){if(!this.arr)return!1;var t=0;return this.arr.forEach((function(e){e.forEach((function(e){e&&e.bomb&&"marked"===e.state&&t++}))})),t===l.noOfBombs}},{key:"countCellsWithState",value:function(t){if(!this.arr)return 0;if(!t||!v.includes(t))return 0;for(var e=0,n=0;n<this.rows;n++)for(var r=0;r<this.cols;r++)this.arr[n][r].state===t&&e++;return e}}],[{key:"checkNoOfBombsParam",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"FieldClass constructor: ";if(!Number.isSafeInteger(t))throw new TypeError("".concat(e,"'noOfBombs' should be non-negative integer value."));if(t<0)throw new RangeError("".concat(e,"'noOfBombs' should be non-negative integer value."));return!0}}]),n}(function(){function t(e,n,r){if(Object(b.a)(this,t),void 0===(this instanceof t?this.constructor:void 0))throw new Error("Arr2dClass constructor: not called using the 'new' operator as it should be.");t.checkRowsColsParams(e,n),t.checkElementClassParam(r),this.rows=e,this.cols=n;for(var s=arguments.length,i=new Array(s>3?s-3:0),a=3;a<s;a++)i[a-3]=arguments[a];this.arr=this.initArr.apply(this,[r].concat(i))}return Object(y.a)(t,[{key:"initArr",value:function(e){for(var n=this,r=arguments.length,s=new Array(r>1?r-1:0),i=1;i<r;i++)s[i-1]=arguments[i];return t.checkElementClassParam(e),new Array(this.rows).fill().map((function(t,r){return Array(n.cols).fill().map((function(t,n){return e?Object(k.a)(e,s):{}}))}))}},{key:"isRowInRange",value:function(t){return!!Number.isSafeInteger(t)&&!(t<0||t>=this.rows)}},{key:"isColInRange",value:function(t){return!!Number.isSafeInteger(t)&&!(t<0||t>=this.cols)}},{key:"isRowColInRange",value:function(t,e){return this.isRowInRange(t)&&this.isColInRange(e)}},{key:"addIfNotIncluded",value:function(t,e){if(!t||!e)return 0;if(!Array.isArray(t))return 0;var n=JSON.stringify(e);return JSON.stringify(t).includes(n)||t.push(JSON.parse(n)),t.length}},{key:"adjacency4IndexesList",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!this.isRowColInRange(t,e))return[];if(1===this.rows&&1===this.cols)return[];var r=[[t,e]];return this.isRowInRange(t-1)?this.addIfNotIncluded(r,[t-1,e]):n&&this.addIfNotIncluded(r,[this.rows-1,e]),this.isRowInRange(t+1)?this.addIfNotIncluded(r,[t+1,e]):n&&this.addIfNotIncluded(r,[0,e]),this.isColInRange(e-1)?this.addIfNotIncluded(r,[t,e-1]):n&&this.addIfNotIncluded(r,[t,this.cols-1]),this.isColInRange(e+1)?this.addIfNotIncluded(r,[t,e+1]):n&&this.addIfNotIncluded(r,[t,0]),r.shift(),r.sort()}},{key:"adjacency8IndexesList",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!this.isRowInRange(t)||!this.isColInRange(e))return[];if(1===this.rows&&1===this.cols)return[];var r=this.adjacency4IndexesList(t,e,n);return r.unshift([t,e]),this.isRowInRange(t-1)?(this.isColInRange(e-1)?this.addIfNotIncluded(r,[t-1,e-1]):n&&this.addIfNotIncluded(r,[t-1,this.cols-1]),this.isColInRange(e+1)?this.addIfNotIncluded(r,[t-1,e+1]):n&&this.addIfNotIncluded(r,[t-1,0])):n&&(this.isColInRange(e-1)?this.addIfNotIncluded(r,[this.rows-1,e-1]):this.addIfNotIncluded(r,[this.rows-1,this.cols-1]),this.isColInRange(e+1)?this.addIfNotIncluded(r,[this.rows-1,e+1]):this.addIfNotIncluded(r,[this.rows-1,0])),this.isRowInRange(t+1)?(this.isColInRange(e-1)?this.addIfNotIncluded(r,[t+1,e-1]):n&&this.addIfNotIncluded(r,[t+1,this.cols-1]),this.isColInRange(e+1)?this.addIfNotIncluded(r,[t+1,e+1]):n&&this.addIfNotIncluded(r,[t+1,0])):n&&(this.isColInRange(e-1)?this.addIfNotIncluded(r,[0,e-1]):this.addIfNotIncluded(r,[0,this.cols-1]),this.isColInRange(e+1)?this.addIfNotIncluded(r,[0,e+1]):this.addIfNotIncluded(r,[0,0])),r.shift(),r.sort()}}],[{key:"checkRowsColsParams",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Arr2dClass constructor: ";if(!Number.isSafeInteger(t)||!Number.isSafeInteger(e))throw new TypeError("".concat(n,"You have to provide 2 positive integer arguments to create new Arr2dClass object."));if(t<=0||e<=0)throw new RangeError("".concat(n,"You have to provide 2 positive integer arguments to create new Arr2dClass object."));return!0}},{key:"checkElementClassParam",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Arr2dClass constructor: ";if(t&&"function"!==typeof t)throw new TypeError("".concat(e,"the third argument, when provided, should be the Arr2dClass element class name."));return!0}}]),t}()),S=(n(27),n.p+"static/media/bomb.50cb791f.svg");var x=function(){return Object(r.jsxs)("footer",{className:"logoArea",children:[Object(r.jsxs)("p",{children:["\xa0\xa0\xa0M I N E",Object(r.jsx)("br",{}),"SWEEPER"]}),Object(r.jsx)("img",{src:S,className:"appLogo",alt:"logo"})]})},A=(n(28),new R(l.rows,l.cols,l.noOfBombs)),B=null,E=function(){var t=Object(s.useState)("init"),e=Object(c.a)(t,2),n=e[0],i=e[1],a=Object(s.useState)(0),o=Object(c.a)(a,2),l=o[0],d=o[1],u=Object(s.useState)(0),h=Object(c.a)(u,2),m=h[0],b=h[1],v=JSON.stringify(A.arr),I=Object(s.useState)(JSON.parse(v)),g=Object(c.a)(I,2),j=g[0],O=g[1];Object(s.useEffect)((function(){return"init"===n?(A.resetField(),d(0),b(0),O(JSON.parse(JSON.stringify(A.arr))),B&&(clearInterval(B),B=null)):"action"===n?B=setInterval(w,1e3):"defeat"===n?B&&(clearInterval(B),B=null):"victory"===n&&B&&(clearInterval(B),B=null),function(){B&&(clearInterval(B),B=null)}}),[n]);var w=function(){b((function(t){return t+1}))};return Object(r.jsxs)("div",{className:"minesweepergame",onContextMenu:function(t){return t.preventDefault()},children:[Object(r.jsx)(f,{marked:l,timeElapsed:m,myResetBtnClickHandler:function(t){1!==t.which&&0!==t.button||i("init")}}),Object(r.jsx)(N,{cellArr:j,gameState:n,myCellClickHandler:function(t){var e=Number(t.target.dataset.r),r=Number(t.target.dataset.c),s=!1;"init"!==n&&"action"!==n||("init"===n&&i("action"),1!==t.which&&0!==t.button||"open"!==j[e][r].state&&(A.arr[e][r].state="open",j[e][r].bomb&&i("defeat"),s=!0),3!==t.which&&2!==t.button||("closed"===j[e][r].state?(A.arr[e][r].state="marked",d(l+1),A.isWinConditionSatisfied()&&i("victory"),s=!0):"marked"===j[e][r].state&&(A.arr[e][r].state="closed",d(l-1),A.isWinConditionSatisfied()&&i("victory"),s=!0))),s&&O(JSON.parse(JSON.stringify(A.arr)))}}),Object(r.jsx)(x,{})]})};n(29);o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(E,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.84822531.chunk.js.map