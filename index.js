function pro(res) {
    console.log(res);
    found = res.login == undefined

    document.getElementById('avatar').src = (found) ? '/images/error.png' : res.avatar_url;

    document.getElementById('name').innerHTML = (found) ? 'Not Found' : res.name;

    document.getElementById('bio').innerHTML = (found) ? 'This Username does not exist' : res.bio;

    document.getElementById('company').innerHTML = (found) ? '' : res.company;

    document.getElementById('location').innerHTML = (found) ? '' : res.location;

    document.getElementById('blog').innerHTML = (found) ? '' : res.blog;
    document.getElementById('blog').href = (found) ? '' : res.blog;

    document.getElementById('twitter').innerHTML = (found) ? '' : '@' + res.twitter_username;
    document.getElementById('twitter').href = (found) ? '' : 'https://twitter.com/' + res.twitter_username;

    document.getElementById('followers').innerHTML = (found) ? '' : "Followers: " + res.followers;

    document.getElementById('following').innerHTML = (found) ? '' : "Following: " + res.following;

    document.getElementById('public_repos').innerHTML = (found) ? '' : "Public Repositories: " + res.public_repos;

    // document.getElementById('stared-topics').innerHTML = (found) ? '' : res.;
}

function fun() {
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
});
