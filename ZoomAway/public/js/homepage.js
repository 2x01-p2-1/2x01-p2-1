$(document).ready(async function () {
    const response = await axios.get('/challenges/')
    challenges = response.data
    for (let i in challenges) {
        $('#challengeTable tbody').append(`
        <tr>
            <td>${challenges[i].challengeName}</td>
            <td></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" onclick="window.location.href='/attemptChallenge/${challenges[i]._id}'"><i class="bi bi-arrow-right-circle"></i> Attempt</button></td>
        </tr>
    `)
    }
})