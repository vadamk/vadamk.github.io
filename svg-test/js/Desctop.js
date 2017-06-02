function Desctop(d) {

    var iconContainer = Snap("#icon1"),
        animating = false,
        over = false;

    Snap.load("./ico/desctop_w.svg", function(s) {
        iconContainer.append(s)
        iconContainer.select("svg").attr("pointer-events","none");

        iconContainer.mouseover(function() {
            over = true;

            this.mouseout(function() {
                over = false;
            });

            over ? desctopRepeater() : null;
        });

        function desctopRepeater() {
            if (!animating) {
                animating = true;
                desctopScenario();
                setTimeout(function() {
                    animating = false
                    over ? desctopRepeater() : null;
                }, d)
            }
        }

        var code = iconContainer.select("#code"),
            lines = code.selectAll("line"),
            interface = iconContainer.select("#interface"),
            paths = interface.selectAll("g"),
            interfaceCont = iconContainer.select("#interface_item_cont")
            bboxCode = code.getBBox(),
            bboxInterfaceCont = interfaceCont.getBBox();

        function desctopScenario() {
            desctopStep1(0, d*.25);
            desctopStep2(d*.25, d*.75);
        }
        

        function desctopStep1(delay, duration) {
            setTimeout(function() {
                code.animate({
                    transform: "t0,"+(bboxCode.h+30)
                }, duration);

                interfaceCont.animate({
                    transform: "t0,"+(bboxInterfaceCont.y+bboxInterfaceCont.h+30)
                }, duration);

            }, delay);
        }

        function desctopStep2(delay, duration) {
            setTimeout(function() {
                lines.forEach(function(item) {
                    item.attr({
                        opacity: 0 
                    });
                }, this);

                paths.forEach(function(item) {
                    item.attr({
                        opacity: 0 
                    });
                }, this);

                code.animate({
                    transform: "t0,0"
                });

                interfaceCont.animate({
                    transform: "t0,0"
                });
                
                var linesD = duration / lines.length / 2;
                var pathsD = duration / paths.length / 2;
                
                lines.forEach(function(el, i) {
                    setTimeout(function() {
                        el.animate({
                            opacity: 1,
                        }, i*linesD);
                    }, i*linesD);
                }, this);

                paths.forEach(function(el, i) {
                    setTimeout(function() {
                        el.animate({
                            opacity: 1,
                        }, i*pathsD);
                    }, i*pathsD);
                }, this);
            }, delay);
        }
    });
}