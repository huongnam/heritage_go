/**
 * Copyright (C) 2018 Majormode.  All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Majormode or one of its subsidiaries.  You shall not disclose this
 * confidential information and shall use it only in accordance with the
 * terms of the license agreement or other applicable agreement you
 * entered into with Majormode.
 *
 * MAJORMODE MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY
 * OF THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE, OR NON-INFRINGEMENT.  MAJORMODE SHALL NOT BE LIABLE FOR ANY
 * LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

function initialize() {
  $('#join-btn').on('click', function(e){
    let form = $(e.target).parents('form');
    let isValid = form[0].checkValidity();
    console.log(isValid);
    if(isValid) {
      onUserRegistrationButtonClicked(e.target);
      $('#field-email').val('');
      return false;
    }
  });
}


/**
 * Called whenever the user clicks on the button to register his account
 * to the platform.
 *
 *
 * @param event: properties of the event that has been fired.
 */
function onUserRegistrationButtonClicked(event) {
  let emailAddress = $('#field-email').val();
  let registrationButton = $('#join-btn');

  enableWaitingAnimation(registrationButton);

  mComingSoonService.registerAccount({
    emailAddress: emailAddress,

    successCallback: function (payload) {
      disableWaitingAnimation(registrationButton);
      swal(gettext('coming_soon.message.title.success'), gettext('coming_soon.message.user_registration_succeeded'), 'success');
    },

    failureCallback: function (exception) {
      disableWaitingAnimation(registrationButton);

      if (exception instanceof ContactAlreadyUsedException) {
        swal(gettext('coming_soon.message.title.error'), gettext('coming_soon.message.email_address_already_used'), 'error');
      } else {
        swal(gettext('coming_soon.message.title.error'), gettext('coming_soon.message.unexpected_server_error'), 'error');
      }
    }
  });
}


/**
 * Show the specified toast message for the specified duration.
 *
 *
 * @param text: the text to be displayed in a the toast message.
 *
 * @param level: level of this message as defined by the ``toastr``
 *    library.
 *
 * @param options: a dictionary of options as defined by the ``toastr``
 *    library.
 */
function showToast(text, level, options) {
  toastr.options = {
    extendedTimeOut: 1000,
    hideDuration: 1000,
    hideEasing: 'linear',
    hideMethod: 'fadeOut',
    newestOnTop: 'top',
    positionClass: 'toast-bottom-center',
    progressBar: true,
    preventDuplicates: false,
    showDuration: 500,
    showEasing: 'swing',
    showMethod: 'fadeIn',
    timeOut: (options && options.timeOut) || 5000
  };

  toastr[level || 'info'](text);
}
//Function set margin top for #site-root to center vertical
function setRootCenter(){
  let heightScreen = $(window).innerHeight();

  let heightRoot = $('#site-root').innerHeight();
  let height = (heightScreen - heightRoot)/2 - 60;
  if(height > 0){
    $('#site-root').css('margin-top', height);
  }
}

// Called whenever the page's Document Object Model (DOM) becomes safe
// to manipulate.  This is the good time to perform initialization tasks
// that are needed before the user views or interacts with the page.
$(document).ready(function () {
  initialize();


  // let widthScreen = $(window).innerWidth();
  // console.log(widthScreen);
  // if(widthScreen > 639){
  //   setRootCenter();
  //   $(window).resize(function(){
  //     setRootCenter();
  //   });
  // }


});
