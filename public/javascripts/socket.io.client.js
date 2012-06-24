/**
 * @overview
 *
 * @author 
 * @version 2012/06/21
 */

(function ($, io) {
    if ( ! window.location.pathname.match('/room/')) {
        return;
    }
    var listTpl = $('#js-list-template').html();
    var editListTpl = $('#js-edit-list-template').html();
    var contentListTpl = $('#js-content-list-template').html();
    var listNode = $('#list');

    var socket = io.connect();
    socket.on('index', function (data) {
    }); 

    socket.on('create', function (data) {
        var newTpl = listTpl.replace(/{{list-id}}/g, data._id);
        newTpl = newTpl.replace(/{{list-content}}/g, data.content);

        listNode.append(newTpl);
    }); 

    socket.on('edit', function (data) {
        var target = $('#' + data._id),
            updateNode = target.find('span.update'),
            newTpl;

        newTpl = contentListTpl.replace(/{{list-id}}/g, data._id);
        newTpl = newTpl.replace(/{{list-content}}/g, data.content);

        updateNode.html(newTpl);
    });

    socket.on('destory', function (data) {
        $('#' + data.id).remove();
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

    listNode.on('click', 'a.update-link', function (e) {
        e.preventDefault();

        var target = $(this),
            newTpl,
            targetContent = target.html(),
            id = target.attr('href').split('/').pop();

        newTpl = editListTpl.replace(/{{list-id}}/g, id);
        newTpl = newTpl.replace(/{{list-content}}/g, targetContent);

        $(this).parent().html(newTpl);
    });

    listNode.on('submit', 'form.update-form', function (e) {
        e.preventDefault();

        var target = $(this),
            inputContent = target.find('input[name=content]').val(),
            inputId = target.find('input[name=id]').val();

        socket.emit('edit', {
            id: inputId,
            content: inputContent
        });
    });

    listNode.on('click', 'a.del-btn', function (e) {
        e.preventDefault();

        var id = $(this).attr('href').split('/').pop();

        if (id === "") {
            return;
        }

        socket.emit('destory', {
            'id' : id 
        });
    });

})(jQuery, io);

