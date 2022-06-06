// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {
    $('#modalLoginForm').modal('show')
    $('#entrar').click(function () {
        var nome = $('#name').val()
        var sala = $('#room').val()
        $('#userInput').val(nome)
        $('#roomInput').val(sala)
        $('#modalLoginForm').modal('hide')
        $('#bemvindo').text('Bem Vindo, '+nome)
    })
});

