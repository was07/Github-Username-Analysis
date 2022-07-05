function pro(res) {
    console.log(res);
    error = res.login == undefined
    console.log(error)

    document.getElementById('avatar').src = (error) ? '/images/error.png' : res.avatar_url;

    document.getElementById('name').innerHTML = (error) ? 'Not found' : res.name;

    document.getElementById('bio').innerHTML = (error) ? 'This Username does not exist' : res.bio;

    document.getElementById('company').innerHTML = (error) ? '' : res.company;

    document.getElementById('location').innerHTML = (error) ? '' : res.location;

    document.getElementById('blog').innerHTML = (error) ? '' : res.blog;
    document.getElementById('blog').href = (error) ? '' : res.blog;

    document.getElementById('twitter').innerHTML = (error) ? '' : ('@' + res.twitter_username);
    document.getElementById('twitter').href = (error) ? '' : 'https://twitter.com/' + res.twitter_username;

    document.getElementById('followers').innerHTML = (error) ? '?' : res.followers.toLocaleString("en-US");

    document.getElementById('following').innerHTML = (error) ? '?' : res.following.toLocaleString("en-US");

    // get how many followers the user follow
    get(res.followers_url + "?per_page=100").then(followers => function(followers) {
        get("https://api.github.com/users/" + res.login + "/following?per_page=100").then(following => proccessFollowers(followers, following, error));
    }(followers));

    document.getElementById('public_repos').innerHTML = "Public Repositories: " + ((error) ? '?' : res.public_repos);
    
    document.getElementById('public_gists').innerHTML = "Public Gists: " + ((error) ? '?' : res.public_gists);

    // document.getElementById('stared-topics').innerHTML = (error) ? '' : res.;

    console.log(T (res.created_at))
}

function proccessFollowers(followers, following, error) {
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
    document.getElementById('ff').innerHTML = (error)? '?' : ff.toLocaleString("en-US");
}

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: new Headers(
            {
                'User-Agent': 'request',
                'Authorization': 'TOKEN GOES HERE',
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
