$(document).ready(async function () {
    const response = await axios.get('/challenges/')
    challenges = response.data
    for (let i in challenges) {
        $('#challengeTable tbody').append(`
        <tr>
            <td>${challenges[i].challengeName}</td>
            <td></td>
            <td class="text-center"><button class="btn btn-sm btn-danger deleteBtn" data-challengeid=${challenges[i]._id}><i class="bi bi-trash"></i></button></td>
        </tr>
    `)
    }

    $('#challengeTable').on('click', ".deleteBtn", function (e) {
        var opener = e.currentTarget.dataset;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(response => {
            if (response.isConfirmed) {
                Swal.fire({
                    text: "Loading...",
                    imageUrl: "https://www.boasnotas.com/img/loading2.gif",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false
                });
                axios.delete('/challenges/' + opener.challengeid).then(response => {
                    Swal.close()
                    Swal.fire({
                        title: "Success !",
                        text: "Successfully Delete Challenge",
                        icon: "success"
                    }).then(response => {
                        location.reload();
                    })
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then(response => {
                        location.reload();
                    })
                })



            }
        })
    })
})