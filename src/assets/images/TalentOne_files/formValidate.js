	//	Validations for Form

$(document).ready(function() {
	// dsr validation
	$(".vaidation").bind("change keyup", function(event){
  var row =  $(this).attr("data-id");
  var project_id  = $('.select-project'+row).val();
  var des = $('.dsr-area'+row).val(); 
  if(des == '' &&  project_id == '' ){
    $('#des'+row).html("Please Enter Description");
    $('#projectid'+row).html("Please Select Project");
     return false ;
  }else{
      $('#des'+row).html("");
        $('#projectid'+row).html("");
  }
 if(project_id == '' ){
   $('#projectid'+row).html("Please Select Project");
   return false ;
  }else{
     $('#projectid'+row).html("");
  }
  if(des == ''){
    $('#des'+row).html("Please Enter Description");
     return false ;
  }else{
      $('#des'+row).html("");
  } 

});


	jQuery.validator.addMethod("require_from_group", function (value, element, options) {
        var numberRequired = options[0];
        var selector = options[1];
        var fields = $(selector, element.form);
        var filled_fields = fields.filter(function () {
            // it's more clear to compare with empty string
            return $(this).val() != "";
        });
        var empty_fields = fields.not(filled_fields);
        // we will mark only first empty field as invalid
        if (filled_fields.length < numberRequired && empty_fields[0] == element) {
            return false;
        }
        return true;
        // {0} below is the 0th item in the options field
    }, "Enter valid time");


	// validate for form on keyup and submit

	$("#add_user").validate({
		rules: {
			'employee_code': {
				required: true,
				maxlength: 30
			},
			'first_name': {
				required: true,
				maxlength: 30
			},
			'last_name': {
				required: true,
				number: false,
				maxlength: 30
			},
			'email': {
				required: true,
				email:true
			},
			'password': {
				required: true,
				minlength: 6,
				maxlength: 20
			},
			'mobile_number':{
				required: true,
				number: true,
				minlength:10,
				maxlength:12,
			},
			'address':{
				required: true
			},
			'permanent_address':{
				required: true
			},
			'date_of_joining':{
				required: true
			},

			'designations': {
				required: true
			},
			'department':{
				required: true
			},
			'reportingManager':{
				required: function(elem)
				{
					if($('#add_user .user_role:checked').val() == 4){
						return true
					}else{
						$(elem).closest('.form-group').removeClass('has-error');
						$('#reporting_manager_one').removeClass('error');
						return false
					}
				}
			},
			'image':{
				// required: true,
				accept: "image/jpeg, image/jpg,image/png"
			},
			'role_id':{
				required: true
			},
			'permission[]':{
			required: function(elem)
			{
				return $(".is_admin_cls").val() == 0;
			}
			},
			'status':{
				required: true
			}
		},

		messages: {

			'first_name': {
				required: "Please enter first name."
			},
			'last_name': {
				required: "Please enter last name.",
				number: "Please enter only alphabet",
			},
			'email':{
				required: "Please enter employee email address.",
				email:"Please enter a valid email address"
			},
			'password': {
				required: "Please enter password.",
				minlength: "Your password must be at least 6 digits long.",
				maxlength: "Your password must be maximum of 20 digits long."
			},
			'mobile_number':{
				required: "Please enter mobile number."
			},
			'address':{
				required: "Please enter address."
			},
			'permanent_address':{
				required: "Please enter permanent address."
			},
			'date_of_joining':{
				required: "Please enter date of joining."
			},
			'role_id':{
				required:"Please select role."
			},

			'designations':{
				required: "Please select designation."
			},
			'department':{
				required: "Please select department."
			},
			'reportingManager':{
				required: "Reporting manager field is required when role type is employee."
			},
			'permission[]':{
				required: "Please select permission."
			},
			'status':{
				required: "Please select status."
			},
			'image' : {
				accept: "Please upload valid file. Only  JPEG, PNG & JPG allowed"
			}
		},
		errorPlacement: function (error, element) {
			$(element).closest('.form-group').addClass('has-error');
			if ($(element).next().hasClass('help-block')) {
				$(element).next().remove();
			}
			$(element).closest('.input-group').after(error);
			$(element).on('keypress keyup change', function () {
				var resp = $(this).valid();
				if (resp === false) {
					$(element).closest('.form-group').addClass('has-error');
				} else {
					$(element).closest('.form-group').removeClass('has-error');
				}
			});
		},
		success: function (element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		submitHandler: function (form) {
			// $('.employee_loader').show();
			formSubmit(form);
		}
	});

	// validate form for update user
	$("#update_user").validate({
		rules: {
			'first_name': {
				required: true,
				maxlength: 30
			},
			'last_name': {
				required: true,
				number: false,
				maxlength: 30
			},
			'email': {
				required: true,
				email:true
			},
			'mobile_number':{
				required: true,
				number: true,
				minlength:10,
				maxlength:12,
			},
			'address':{
				required: true
			},
			'permanent_address':{
				required: true
			},
			'date_of_joining':{
				required: true
			},
			'role_id': {
				required: true
			},
		
			'designations': {
				required: true
			},
			'department':{
				required: true
			},
			'reportingManager':{
				required: function(elem)
				{
					if($('#add_user .user_role:checked').val() == 4){
						return true
					}else{
						$(elem).closest('.form-group').removeClass('has-error');
						$('#reporting_manager_one').removeClass('error');
						return false
					}
				}
			},
			'status':{
				required: true
			}
		},

		messages: {
			'first_name': {
				required: "Please enter first name."
			},
			'last_name': {
				required: "Please enter last name.",
				number: "Please enter only alphabet"
			},
			'email':{
				required: "Please enter employee email address.",
				email:"Please enter a valid email address"
			},
			'password': {
				required: "Please enter password.",
				minlength: "Your password must be at least 6 digits long.",
				maxlength: "Your password must be maximum of 20 digits long."
			},
			'mobile_number':{
				required: "Please enter mobile number."
			},
			'address':{
				required: "Please enter address."
			},
			'permanent_address':{
				required: "Please enter permanent address."
			},
			'date_of_joining':{
				required: "Please enter date of joining."
			},

			'role_id':{
				required:"Please select role."
			},
		
			'designations':{
				required: "Please select designation."
			},
			'department':{
				required: "Please select department."
			},
			'reportingManager':{
				required: "Reporting manager field is required when role type is employee."
			},
			'status':{
				required: "Please select select."
			}
		}
	});

	//*----validation for change password-----*//
	$("#change_password").validate({
		rules: {

			'old_password': {
				required: true,
			},
			'new_password': {
				required: true,
				minlength: 8
			},
			'confirm_password': {
				required: true,
				equalTo: "#new_password"
			}

		},

		messages: {
			'old_password': {
				required: "Please enter old password"
			},

			'new_password': {
				required: "Please enter new password"
			},

			'confirm_password':{
				required: "Please enter confirm password",
				equalTo: "New password and confirm password does not match",

			},
		}
	});
});

//*------------validation for add dsr--------------*//

	$("#add_dsr").on('submit',function(event){
      	var fieldLength=1,
      	rules = {},
      	messages = {}
      	// groups={"names":""};

      	$('.dsr').each(function(e, v) {

      		if (v.name.match(/hours.*/) || v.name.match(/minutes.*/)) {

		      	var keys = v.name.replace("hours",'')
		      					 .replace("minutes",'')
		      					 .replace(new RegExp(']', 'g'),'')
		      					 .replace('[','_').replace('[','_');

				rules[v.name] = {

		            require_from_group:[1, ".hours-minutes"+keys],
		            // min:1
		        };

			}else{

				rules[v.name] = {

		            required:true,
					 normalizer: function(value) {
                        return $.trim(value)
                    }
		        };

		        messages[v.name] = {

		            required:"This field is required"

		        };
			}

	        fieldLength++;

      	});


      	$(this).validate({

        	rules:rules,
        	messages:messages
      	});

      	if(!$(this).validate().form()) {
	        event.preventDefault();
	        console.log("does not validate");
	        return false;
      	}

      	$(this).find(':input[type=submit]').prop('disabled', true);

      	var values = {};
      	$.each($(this).serializeArray(), function(i, field) {
          	values[field.name] = field.value;
      	});

      	// console.log('Form is validated, do the work')
	});

	//*------------validation for add project--------------*//
	$(document).ready(function() {
	// validate for form on keyup and submit
	// ignore[];
	/*$("#add_project_form").validate({
		rules: {
			'name':{
				required: true
			},
			'start_date':{
				required: true
			},
			'end_date':{
				required: true
			}
		},
		messages: {

			'name': {
				required: "Please enter project name."
			},
			'start_date': {
				required: "Please select start date."
			},
			'end_date': {
				required: "Please select end date."
			}
		}
	});
*/
		$('#add_project_form').validate({
			rules: {
				'name': {
					required: true,
				},
				'start_date': {
					required: true,
					date: true,
				},
				'end_date': {
					date: true,
				},
				'client_name': {
					number: false,
				},
				'project_manager': {
					required: true,
				},
				'team_lead': {
					required: true,
				},
				'hours_approved_or_spent': {
					required: true,
				},
				'project_url': {
					url: true,
				},
				'technology': {
					required: true,
				},
				'dev_server_url': {
					url: true,
				},
				'qa_server_url': {
					url: true,
				},
				'git_url': {
					url: true,
				},
				'project_document_url': {
					url: true,
				},
				'project_video': {
					url: true
				},
				'current_status': {
					required: true,
					number: false
				}
			},
			messages: {
				'name': {
					required: 'Please enter project name.'
				},
				'start_date': {
					required: 'Please select start date',
					date: 'Please enter valid date'
				},
				'end_date': {
					date: 'Please enter valid date'
				},
				'project_manager': {
					required: 'Please select project manager'
				},
				'team_lead': {
					required: 'Please select team lead'
				},
				'hours_approved_or_spent': {
					required: 'Please enter hours'
				},
				'project_url': {
					url: 'Please enter valid url'
				},
				'technology':{
					required: 'Please enter technology'
				},
				'dev_server_url': {
					url: 'Please enter valid url'
				},
				'qa_server_url': {
					url: 'Please enter valid url'
				},
				'git_url': {
					url: 'Please enter valid url'
				},
				'project_document_url': {
					url: 'Please enter valid url'
				},
				'project_video': {
					url: 'Please enter valid url'
				},
				'current_status': {
					required: 'Please enter current status of the project',
					number: 'Please enter only text'
				}
			},
			errorPlacement: function (error, element) {
				//console.log(element);
				$(element).closest('.form-group').addClass('has-error');
				if ($(element).next().hasClass('help-block')) {
					$(element).next().remove();
				}
				$(element).closest('.input-group').after(error);
				$(element).on('keypress keyup change', function () {
					var resp = $(this).valid();
					if (resp === false) {
						$(element).closest('.form-group').addClass('has-error');
					} else {
						$(element).closest('.form-group').removeClass('has-error');
					}
				});
			},
			success: function (element) {
				//console.log('success');
				$(element).closest('.form-group').removeClass('has-error');
			},
			submitHandler: function(form) {
				$(form).find('button').addClass('enableOnce');
				if ($(form).valid())
					form.submit();
				return false; // prevent normal form posting
			}
		});



		$("#add_category").validate({
    rules:
    {
      name: {
        required: true,
      },
    },
    messages:
    {
      name: {
        required: "Please enter category name",
      },
    }
  });

	$("#add_vendor").validate({
    rules:
    {
      name: {
        required: true,
      },
			phone1: {
				minlength:10,
				maxlength:12,
				number: true
			},
			phone2: {
				minlength:10,
				maxlength:12,
				number: true
			},
    },
    messages:
    {
      name: {
        required: "Please enter vendor name",
      },
			phone1: {
				minlength: "Phone 1 must be at least 10 characters long",
				maxlength: "Phone 1 must be less than 12 characters long",
				number: "Phone must be number"
			},
			phone2: {
				minlength: "Phone 2 must be at least 10 characters long",
				maxlength: "Phone 2 must be less than 12 characters long",
				number: "Phone 2 must be number"
			},
    }
  });

	//add inventoryItem
	$("#add_inventoryItem").validate({
    rules:
    {
      generate_id: {
        required: true,
      },
      category_id: {
        required: true,
      },
      name: {
        required: true,
      },
		company_name: {
		required: true,
		},
		serial_no: {
		required: true,
	  },
    },
    messages:
    {
      generate_id: {
        required: "Please enter generate id",
      },
      category_id: {
        required: "Please select category",
      },
      name: {
        required: "Please enter item name",
      },
		company_name: {
			required: "Please enter company name",
		},
		serial_no: {
			required: "Please enter serial number",
		},
    }
  });

	// add_reason
	$("#add_reason").validate({
    rules:
    {
      reason: {
        required: $(".reason_cls").length == 1,
      },
      avilability_status: {
        required: $(".avl_cls").length == 1,
      },
      assigned_to: {
        required: $(".usr_cls").length == 1,
      },
    },
    messages:
    {
      reason: {
        required: "Please enter Reason",
      },
      avilability_status: {
        required: "Please select status",
      },
      assigned_to: {
        required: "Please select User",
      },
    }
  });

  
  
//*----validation for Leave Request-----*//
$("#create-leave-form").validate({
	rules: {

		'title': {
			required: true,
		},
		'description': {
			required: true,
		},
		'type': {
			required: true,
		},
		'start_date': {
			required: true,
		},
		'attachment':{
			accept: "image/jpeg, image/jpg,image/png, pdf,doc,docx,csv"
		},
		'leave_time': {
			required: function(element) {
			  return (($('#type').val()=='half_day') || ($('#type').val()=='short_leave'));
			}
		}


	},

});

//*----validation for update profile pic-----*//
$("#update-profile-pic").validate({
	rules: {
		'image':{
			required: true,
			accept: "image/jpeg, image/jpg,image/png"
		}
	},
	messages:
    {
		image: {
			accept: "Please select valid photo with png jpg jpeg extension",
      	}
    },
	submitHandler: function (form) {
		formSubmit(form);
	}
});

$("#add_department").validate({
	rules: {
		'department_code': {
			required: true
		},
		'department_name': {
			required: true
		}
	},
	errorPlacement: function (error, element) {
		$(element).closest('.form-group').addClass('has-error');
		if ($(element).next().hasClass('help-block')) {
			$(element).next().remove();
		}
		$(element).closest('.input-group').after(error);
	}
});

$("#edit_department").validate({
	rules: {
		'code': {
			required: true
		},
		'name': {
			required: true
		}
	},
	errorPlacement: function (error, element) {
		$(element).closest('.form-group').addClass('has-error');
		if ($(element).next().hasClass('help-block')) {
			$(element).next().remove();
		}
		$(element).closest('.input-group').after(error);
	}
});

$("#add_designation").validate({
	rules: {
		'name': {
			required: true,
		}
	},
	errorPlacement: function (error, element) {
		$(element).closest('.form-group').addClass('has-error');
		if ($(element).next().hasClass('help-block')) {
			$(element).next().remove();
		}
		$(element).closest('.input-group').after(error);
	}
});

});
