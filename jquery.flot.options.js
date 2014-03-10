/* Flot plugin that adds some navigation controls on top of the canvas layer to allow users pan or zoom the graph. This is even more helpful 
    for the touch screen users.

Copyright (c) 2013 http://zizhujy.com.
Licensed under the MIT license.

Usage:
Inside the <head></head> area of your html page, add the following line:

<script type="text/javascript" src="http://zizhujy.com/Scripts/flot/navigationControl/jquery.flot.navigationControl.js"></script>

Now you are all set, there will be pan and zooming controls appear on your canvas.

Online examples:
http://zizhujy.com/FunctionGrapher is using it.

Dependencies:
These navigation controls would only work if you have referenced jquery.flot.navigation.js plugin and enabled it already.

Customizations:
    options = {
            navigationControl: {
            homeRange: {xmin:-10,xmax:10,ymin:-10,ymax:10},
            panAmount: 100,
            zoomAmount: 1.5,
            position: {left: "20px", top: "20px"}
        }
    };

To make the control symbols (+, -, ←, ↑, →, ↓, ⌂) more beautiful, you may include your own icon fonts css file, the symbols 
have the css class 'icon' for you to hook.

*/

; (function ($) {

    function init(plot, classes) {
        plot.hooks.draw.push(drawFlotOptionsStarterButton);

        plot.hooks.shutdown.push(shutdown);
    }

    function drawFlotOptionsStarterButton(plot, canvascontext) {
        var options = plot.getOptions();

        var display = options.optionsControl.display || "none";
        
        var control = "<div id='flot-options-control' style='width: 0; height: 0; left: " + options.optionsControl.position.left + "; top: " + options.optionsControl.position.top + "; position: absolute; display: " + display + ";'>Flot Options</div>";
        var button = "<div id='flot-options-control-button' style='box-sizing: border-box; position: absolute; left: 29px; top: 0; height: 28px; width: 28px; border: solid 1px #666;  padding: 0; line-height: 28px; border-radius: 5px; cursor: pointer; vertical-align: middle; background-color: #f5f5f5; display: inline-block; text-align: center; -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.15); box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);'><div style='height: 100%; line-height: 100%;'><span class='helper'></span><span class='icon' style='color: #666;'>&#x2699</span></div></div>";

        var $placeholder = plot.getPlaceholder();
        $("#flot-options-control").remove();
        $(control).html(button).appendTo($placeholder);

        $("#flot-options-control span.helper").css({
            "display": "inline-block",
            "height": "100%",
            "vertical-align": "middle",
            "position": "relative"
        });

        $placeholder.find("#flot-options-control-button").click(function() {
            
        });
    }

    function shutdown(plot, eventHolder){
        var $placeholder = plot.getPlaceholder();

        $placeholder.find("#flot-options-control-button").unbind("click");
    }
    
    var options = {
        optionsControl: {
            position: { left: "20px", top: "45px" },
            display: "block"
        }
    };

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'flotOptions',
        version: '1.0'
    });

})(jQuery);
