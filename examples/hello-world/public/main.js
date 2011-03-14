define("a/a",["require","exports","module"],function(a,b,c){b.info="a.js"})
define("b/b",["require","exports","module"],function(a,b,c){b.info="b.js"})
define("bootstrap",["require","exports","module","./a/a","./b/b"],function(a,b,c){alert("main.js");var d=a("./a/a"),e=a("./b/b");alert(d.info),alert(e.info)})
