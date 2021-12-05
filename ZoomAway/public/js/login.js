$(document).ready(async function(){
    $('#submitBtn').on('click',function(){
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
    })
})