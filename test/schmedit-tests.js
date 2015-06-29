;(function() {

    module("schmedit");

    test("black is black", function() {
        equal("black", "black", "i want my baby back");
    });

    test("simple span edit, selector arg call", function() {
        var d = document.createElement("div");
        document.body.appendChild(d);
        var s = document.createElement("span");
        s.innerHTML = "FOO";
        d.appendChild(s);
        Schmedit(d, "span", {
            editableClass:"foo",
            editingClass:"bar"
        });

        equal(s.className, " schmeditable foo", "class name assigned");
    });

    test("simple span edit, element arg call", function() {
        var d = document.createElement("div");
        document.body.appendChild(d);
        var s = document.createElement("span");
        s.innerHTML = "FOO";
        d.appendChild(s);
        Schmedit(s, {
            editableClass:"foo",
            editingClass:"bar"
        });

        equal(s.className, " schmeditable foo", "class name assigned");
    });

    test("simple span edit, element arg call, trigger edit", function() {
        var d = document.createElement("div");
        document.body.appendChild(d);
        var s = document.createElement("span");
        s.innerHTML = "FOO";
        d.appendChild(s);

        var commitVal = null;
        var schmeditor = Schmedit(s, {
            editableClass:"foo",
            editingClass:"bar",
            onCommit:function(el, val) {
                commitVal = val;
            }
        });

        // check the span is setup correctly
        equal(s.className, " schmeditable foo", "class name assigned");

        var m = new Mottle();

        // now fake a click on it. it should go into editable mode.
        m.trigger(s, "click");
        equal(s.className, " schmeditable foo schmediting bar", "class name assigned");
        // change its inner html
        s.innerHTML = "changed";
        // fake a click elsewhere; edit should cancel
        new Mottle().trigger(d, "click");
        equal(s.className, " schmeditable foo", "class name restored");
        equal(s.innerHTML, "FOO", "value restored");


        // fake another click on it. it should go into editable mode again.
        m.trigger(s, "click");
        equal(s.className, " schmeditable foo schmediting bar", "class name assigned");
        ok(s.getAttribute("contenteditable") != null, "contenteditable set");
        // change its inner html
        s.innerHTML = "changed";


        // fake a keypress on it (Mottle cannot do this yet. there is a commit method exposed to help with this.)
        //m.trigger(s, "keypress", { keyCode:10 });
        schmeditor.commit();
        equal(s.className, " schmeditable foo", "class name restored");
        equal(commitVal, "changed", "value saved from commit");
        ok(s.getAttribute("contenteditable") == null, "contenteditable unset");
    });

})();