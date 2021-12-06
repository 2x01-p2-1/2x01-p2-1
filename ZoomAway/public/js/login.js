$(document).ready(async function(){
    $('#submitBtn').on('click',function(){
        if ($('#email').val() == "") {
            console.log("no email")
            $('.emailBlank').css('display', 'block')
        } else {
            $('.emailBlank').css('display', 'none')
        }
        if ($('#password').val() == "") {
            console.log("no password")
            $('.passBlank').css('display', 'block')
        } else {
            $('.passBlank').css('display', 'none')
        }
        if ($('#email').val() != "" && $('#password').val() != "") {
            console.log('hit')
            axios.post('/login',{
                email:$('#email').val(),
                password:$('#password').val()
            }).then(response=>{
                window.location.href="/admin/challengesDashboard"
            }).catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid !',
                    text: 'Invalid Credentials!',
                }).then(response => {
                    location.reload();
                })
            })
        }
    })
})