/**
 * @overview
 *
 * @author 
 * @version 2012/06/21
 */

(function ($, io) {
    var listTpl = $('#js-list-template').html();
    var listNode = $('#list');

    var socket = io.connect();
    socket.on('index', function (data) {
        console.log(data);
    }); 
    socket.on('create', function (data) {
        var newTpl = listTpl.replace(/{{list-id}}/g, data._id);
        newTpl = newTpl.replace(/{{list-content}}/g, data.content);

        listNode.append(newTpl);
    }); 


    $('form').submit(function (e) {
        e.preventDefault();

        var inputNode = $(this).find('input[name=content]'),
            val = inputNode.val();  

        if (val === "") {
            return;
        }

        socket.emit('create', {
            'content' : val    
        });

        // reset content
        inputNode.val('');
    });
})(jQuery, io);

