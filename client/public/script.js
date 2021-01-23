$('#reg').click(function(event){
    window.location.href='/registration'
})

$("#asType").trigger("change");
$('#asType').change(function(){
    $('.P').hide();
    $('#' + $(this).val()).show();
});

$('#registerJs').click(function(event){
    window.location.href='/registrationJs'
})

$('#registerEmp').click(function(event){
    window.location.href='/registrationEmp'
})

$('#jregister').click(function(){
    let type = 'jobseeker'
    let userName = $('#name').val()
    let email = $('#email').val()
    let password = $('#psw').val()
    let contact = $('#phn').val()
    let age = $('#age').val()
    let gender = $('#gender').val()
    let eduStatus = $('#edu').val()
    let JobseekerProfile = {
        type: type,
        userName: userName,
        email: email,
        password: password,
        gender: gender,
        eduStatus: eduStatus,
        contact: contact,
        age: age}
    //console.log('Profile', profile)
    $.ajax({
        type: 'POST',
        url: '/jsregister',
        data: JobseekerProfile,
        success: response => {
            console.log(response)
           // window.alert('Registration Done. Try to Login Now')
        },
        error: response => {
            console.log(response)
        }
    })
    //window.alert('Registration Done. Try to Login Now')
})

$('#cregister').click(function(){
    let type = 'company'
    let userName = $('#name').val()
    let email = $('#email').val()
    let password = $('#psw').val()
    let contact = $('#phn').val()
    let companyName = $('#coname').val()
    let companyType = $('#cType').val()
    let companyAddress = $('#cAddress').val()
    let companyDescription = $('#cDescription').val()
    let companyWeb = $('#cWeb').val()
    let EmployeeProfile = {
        type: type,
        userName: userName,
        email: email,
        password: password,
        contact: contact,
        companyName: companyName,
        companyType: companyType,
        companyAddress: companyAddress,
        companyDescription: companyDescription,
        companyWeb: companyWeb }
    //console.log('Profile', profile)
    $.ajax({
        type: 'POST',
        url: '/empregister',
        data: EmployeeProfile,
        success: response => {
            console.log(response)
           // window.alert('Registration Done. Try to Login Now')
        },
        error: response => {
            console.log(response)
        }
    })
    //window.alert('Registration Done. Try to Login Now')
})
