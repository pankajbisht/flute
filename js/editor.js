var editor;
var input = document.getElementById("select");
function selectTheme() {
        var theme = input.options[input.selectedIndex].textContent;
        editor.setOption("theme", theme);
        location.hash = "#" + theme;
      }


$(function () {
 	"use strict";

	var gbl = null;
	window.c = _("#canvas");

	editor = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
		lineNumbers: true,
		matchBrackets: true,
		continueComments: "Enter",
		lineWrapping: true,
        extraKeys: {
            "Ctrl-/": "toggleComment",
            "Ctrl-Space": "autocomplete",
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        styleActiveLine: true,
        matchBrackets: true
	});

    var choice = (location.hash && location.hash.slice(1)) ||
               (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
  if (choice) {
    input.value = choice;
    editor.setOption("theme", choice);
  }

    CodeMirror.on(window, "hashchange", function() {
        var theme = location.hash.slice(1);
        if (theme) { input.value = theme; selectTheme(); }
      });



    function getScript () {
        $(".script").show();
        var script = editor.getValue();
        console.group("script");
        console.log(script);
        console.groupEnd("script");
        $(".script").hide();
        return script;
    }


	function focusOut (e) {
		e.stopPropagation();

		logClear(); //log clear

      	var script = getScript();
        c.clear(0, 0 , 600, 500);

		localStorage.setItem("script", script);

       	$("head").find('script').remove();

        $("head").append("<script>" + script + "</script>");
	}


    function reset () {
        window.location.reload();
    }


	function code () {
		$("canvas").addClass("w3-hide");
        $("textarea, .CodeMirror").removeClass("w3-hide");
        $(".CodeMirror").css("width", "100%");
	}


	function preview () {
	    $("textarea, .CodeMirror").addClass("w3-hide");
        $("canvas").removeClass("w3-hide");
    }


	function tooBox () {
		var self = $(this);
		var text = self.text();

        if (text == "Reset")
            reset();
		else if (text == "Code")
			code();
		else if (text == "Preview")
			preview();
	}


	function logClear () {
		$(".logs").html("");
	}


	function init () {
		if(localStorage.getItem("script")) {
		    gbl = localStorage.getItem("script");
		    $(".script").val(gbl);
			editor.getDoc().setValue(gbl);
		    $(".innerbox").trigger("blur");
		}
	}


	$(document).ready(function () {

		init();

		editor.setSize(600, 500);

		$("#log-clear").on("click", logClear);
		$("div").on("focusout", focusOut);
		$("#tool").on("click", 'button', tooBox);
	});
});
