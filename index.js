function pro(res) {
    console.log(res);

    u = document.getElementById('input').value;

    if (u) {
        document.getElementById('avatar').src = res.avatar_url;
        document.getElementById('avatar-link').href = res.html_url;

        document.getElementById('name').innerHTML = res.name;

        document.getElementById('bio').innerHTML = res.bio;

        document.getElementById('location').innerHTML = res.location;

        document.getElementById('blog').innerHTML = res.blog;
        document.getElementById('blog').href = res.blog;

        document.getElementById('followers').innerHTML = "Followers: " + res.followers;

        document.getElementById('following').innerHTML = "Following: " + res.following;

        document.getElementById('public_repos').innerHTML = "Public Repositories: " + res.public_repos;
    }
}

function fun() {
    console.log('FUN');

    u = document.getElementById('input').value;

    res = fetch('https://api.github.com/users/' + u)
    .then(res => res.json()).then(res => pro(res));
}

fun()

// add event listener for enter key for fun()
document.getElementById('input').addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        fun();
    }
}
);
