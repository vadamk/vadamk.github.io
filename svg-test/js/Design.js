function Design(d) {
    var iconContainer = Snap("#icon4"),
        animating = false,
        over = false;
    
    Snap.load("./ico/design.svg", function(s) {
        iconContainer.append(s)
        iconContainer.select("svg").attr("pointer-events","none");

        iconContainer.mouseover(function() {
            over = true;

            this.mouseout(function() {
                over = false;
            });

            over ? designRepeater() : null;
        });

        function designRepeater() {
            if (!animating) {
                
                animating = true;
                designScenario();
                setTimeout(function() {
                    animating = false
                    over ? designRepeater() : null;
                }, d)
            }
        }

        var pan = iconContainer.select("#pan"),
            way = iconContainer.select("#way"),
            wayLength = Snap.path.getTotalLength( way );

        function designScenario() {
            designStep1(0, d*.25);
            designStep2(d*.25, d*.75);
        }
        
        function designStep1(delay, duration) {
            setTimeout(function() {
                way.animate({
                    opacity: 0
                }, duration*.5)
            }, delay)   
        }

        function designStep2(delay, duration) {
            setTimeout(function() {
                way.attr({
                    opacity: "1"
                });

                way.attr({
                    'stroke-dasharray': wayLength,
                    'stroke-dashoffset': wayLength 
                });

                Snap.animate(0, wayLength, function( value ) {
                    startMovePoint = Snap.path.getPointAtLength( way, 0 );
                    movePoint = Snap.path.getPointAtLength( way, value );
                    pan.attr({ 
                        transform: "t"+(movePoint.x-startMovePoint.x)+","+(movePoint.y-startMovePoint.y)
                    });
                    way.attr({
                        'stroke-dashoffset': wayLength - value
                    });
                }, duration);
            }, delay)   
        }
    });
}

