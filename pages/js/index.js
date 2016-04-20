$(function() {

    function getCenterPosition(div) {
        var w = $(div).width();
        var h = $(div).height();
        var pp = $(div).parents().parents().offset();
        var p = $(div).offset();

        return {
            top: p.top - pp.top + h/2,
            left: p.left - pp.left + w/2
        }
    }

    function getPosition(div) {
        var pp = $(div).parents().offset();
        var p = $(div).offset();

        return {
            top: p.top - pp.top,
            left: p.left - pp.left,
        }
    }

    function findBlockFromPoint(x, y, div) {
        var moveFail = true;
        $('.block').filter(function() {
            var p = getPosition(this);
            var w = $(this).width();
            var h = $(this).height();

            if (p.left < x && x < p.left + w && p.top < y && y < p.top + h) {
                $(this).append(div)
                $(div).css({'top': 0, 'left': 0})
                moveFail = false;
            }
        })
        if (moveFail) {
            $(div).css({'top': 0, 'left': 0})
        }
    }

    $('.drag-box').draggable({
        start: function() {
            var p = getCenterPosition(this);
            // $(this).html('' + p.top + '>>>>> ' + p.left);
            
        },

        drag: function() {
            var p = getCenterPosition(this);
            $(this).css('z-index', '10');
            // $(this).html('' + p.top + ' >>>>> ' + p.left);
            $('.block').css('border-color', '#777');
        },

        stop: function() {
            $(this).css('z-index', '1');
            $('.block').css('border-color', '#ddd');
            var p = getCenterPosition(this);
            findBlockFromPoint(p.left, p.top, this);
            // $(this).html('' + p.top + ' >>>>> ' + p.left);
        }
    });
});