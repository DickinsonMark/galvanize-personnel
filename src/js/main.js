$(function() {
  'use strict';
  var roles;
  $.ajax({
    method: 'get',
    url: 'http://galvanize-student-apis.herokuapp.com/gpersonnel/roles'
  }).done(function(data) {
    roles = data;
    for (var i = 0; i < roles.length; i++) {
      $('select').append('<option value="' + roles[i].title + '">' + roles[i].title + '</option>');
    }

  });
  var $roleSelected;
  $('select').change(function() {
    $roleSelected = $(this).find('option:selected').attr('value');
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].title === $roleSelected) {
        $('img').attr('src', roles[i].img);
      }
    }
  });
  $('#save').on('click', function(e) {
    e.preventDefault();
    var $firstName = $('#firstName').val();
    var $lastName = $('#lastName').val();
    var dataObj = {
      firstName: $firstName,
      lastName: $lastName,
      role: $roleSelected
    };
    $.ajax({
      method: 'post',
      url: 'http://galvanize-student-apis.herokuapp.com/gpersonnel/users',
      data: dataObj
    }).done(function(response) {
      console.log(response);
      $('.save-status').text(response.message).addClass('bg-success text-success').fadeIn(500).delay(2000).fadeOut(500);
    })
    .fail(function(response) {
      console.log(($.parseJSON(response.responseText)).message);
      $('.save-status').text(($.parseJSON(response.responseText)).message).addClass('bg-warning text-warning').fadeIn(500).delay(2000).fadeOut(500);
    });
  });
});
