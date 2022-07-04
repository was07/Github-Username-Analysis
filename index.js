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

    document.getElementById('followers').innerHTML = (found) ? '?' : res.followers.toLocaleString("en-US");

    document.getElementById('following').innerHTML = (found) ? '?' : res.following.toLocaleString("en-US");

    // get how many followers the user follow
    get(res.followers_url + "?per_page=100").then(followers => function(followers) {
        get("https://api.github.com/users/" + res.login + "/following?per_page=100").then(following => proccessFollowers(followers, following, found));
    }(followers));

    document.getElementById('public_repos').innerHTML = "Public Repositories: " + ((found) ? '?' : res.public_repos);
    
    document.getElementById('public_gists').innerHTML = "Public Gists: " + ((found) ? '?' : res.public_gists);

    // document.getElementById('stared-topics').innerHTML = (found) ? '' : res.;
}

function proccessFollowers(followers, following, found) {
    // return how many followers the user follow
    console.log(followers)
    console.log(following)
    ff = 0;
    for (follower in followers) {
        for (followin in following) {
            if (followers[follower].login == following[followin].login) {
                ff++;
            }
        }
    }
    document.getElementById('ff').innerHTML = (found)? '?' : ff.toLocaleString("en-US");
}

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: new Headers(
            {
                'User-Agent': 'request',
                'Authorization': 'token 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',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
    }).then(res => res.json());
}

function fun() {
    u = document.getElementById('input').value;

    get("https://api.github.com/users/" + u).then(res => pro(res));
}

fun()

// add event listener for enter key for fun()
document.getElementById('input').addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        fun();
    }
});
