;(function() {
    "use strict";
    var root = this,
        CONTENT_EDITABLE = "contenteditable",
        KEYPRESS = "keydown",
        CLICK = "click",
        classes = { "editing":"schmediting", "editable":"schmeditable" },
        _getClass = function(ref, claz) {
            var c = [ ref ? classes[ref] || "" : "" ];
            if (claz) c.push(claz);
            return c.join(" ");
        },
        Schmeditor = function(el, selector, options) {
            var _current;
            var mottle = new Mottle();
            options = arguments[arguments.length - 1] || {};
            var editingClass = _getClass("editing", options.editingClass);
            var _keypress = function(e) {
                if (e.keyCode == 10 || e.keyCode == 13) {
                    _close(true);
                } else if (e.keyCode == 27) {
                    _close();
                }
            };
            var _edit = function() {
                if (_editing) _close();
                _current = this;
                mottle.on(document, CLICK, _maybeCancel);
                mottle.on(_current, KEYPRESS, _keypress);
                this._schmeditCN = this.className;
                this._schmeditValue = this.innerHTML;
                this.className = [ this.className, editingClass ].join(" ");
                this.setAttribute(CONTENT_EDITABLE, true);
                _editing = true;
                _current.focus();
            };
            var _close = function(andCommit) {
                _current.className = _current._schmeditCN;
                _current.removeAttribute(CONTENT_EDITABLE);
                mottle.off(document, CLICK, _maybeCancel);
                mottle.off(_current, KEYPRESS, _keypress);
                _editing = false;
                if (andCommit && options.onCommit) {
                    options.onCommit(_current, _current.innerHTML);
                }
                else {
                _current.innerHTML = _current._schmeditValue;
                }
            };
            var _maybeCancel = function(e) {
                if (e.target.className.indexOf("schmediting") == -1) _close();
            };
            var _editing = false, _replacedElement = null;
            var bindArgs = arguments.length == 2 ? [ arguments[0], CLICK ] : [arguments[0], CLICK, arguments[1]];
            bindArgs.push(_edit);
            mottle.on.apply(mottle, bindArgs);

            var els = arguments.length == 2 ? [ el ] : el.querySelectorAll(selector);
            var ec = _getClass("editable", options.editableClass);
            for (var i = 0; i < els.length; i++) {
                els[i].className = [ els[i].className, ec ].join(" ");
            }

            return {
                commit:function() {
                    _close(true);
                }
            };
        };

    root.Schmedit = function(el, selector, options) {
        return Schmeditor.apply(this, arguments);
    };


}).call(this);