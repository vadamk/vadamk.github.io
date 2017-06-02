function QA(d) {
    var iconContainer = Snap("#icon5"),
        animating = false,
        over = false;
    
    Snap.load("./ico/qa.svg", function(s) {
        iconContainer.append(s)
        iconContainer.select("svg").attr("pointer-events","none");

        iconContainer.mouseover(function() {
            over = true;

            this.mouseout(function() {
                over = false;
            });

            over ? qaRepeater() : null;
        });

        function qaRepeater() {
            if (!animating) {
                
                animating = true;
                qaScenario();
                setTimeout(function() {
                    animating = false
                    over ? qaRepeater() : null;
                }, d)
            }
        }

        var lens = iconContainer.select("#lens"),
            bug = iconContainer.select("#bug"),
            mask = iconContainer.select("#mask"),
            scale = lens.transform().localMatrix.a,
            radius = 30;

        lensCircleBBox = lens.select("circle").getBBox();
        maskBBox = mask.getBBox();
        
        function qaScenario() {
            qaStep1(0, d);
        }
        
        function qaStep1(delay, duration) {
            setTimeout(function() {
                Snap.animate(0, 4 * Math.PI, function(angle) {
                    var vx = Math.cos(angle)*radius,
                        vy = Math.sin(angle)*radius;

                    mask.attr({ 
                        transform: "t"+vx+","+vy+"s"+scale
                    });
                    
                    lens.attr({ 
                        transform: "t"+vx+","+vy+"s"+scale
                    });
                }, duration);
            }, delay)
        }
    });
}
