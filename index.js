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

    document.getElementById('twitter').innerHTML = (error) ? '' : ((res.twitter_username == null) ? '' : '@' + res.twitter_username);
    document.getElementById('twitter').href = (error) ? '' : 'https://twitter.com/' + res.twitter_username;

    document.getElementById('followers').innerHTML = (error) ? '?' : res.followers.toLocaleString("en-US");

    document.getElementById('following').innerHTML = (error) ? '?' : res.following.toLocaleString("en-US");

    // get how many followers the user follow
    get(res.followers_url + "?per_page=100").then(followers => function(followers) {
        get("https://api.github.com/users/" + res.login + "/following?per_page=100").then(following => proccessFollowers(followers, following, error));
    }(followers));

    document.getElementById('public_repos').innerHTML = "Public Repositories: " + ((error) ? '?' : res.public_repos);
    
    document.getElementById('public_gists').innerHTML = "Public Gists: " + ((error) ? '?' : res.public_gists);

    // create a time from res.created_at
    var date = new Date(res.created_at);
    // get the difference in months
    var total_months = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24 * 30));

    var years = Math.floor(total_months / 12);
    var months = total_months % 12;

    if (years) {message = years + ' years and ' + months + ' months';} else {message = months + ' months';}
    document.getElementById('created').innerHTML = (error) ? '' : "Account created " + message + " ago";
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

t = "ghp_sP4ONC" + "6Iu2YknSSBC" + "KVMLDJEqlYavT1QQZ23"

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: new Headers(
            {
                'User-Agent': 'request',
                'Authorization': t,
            }
        )
    }).then(res => res.json());
}

function fun() {
    user_name = document.getElementById('input').value;

    get("https://api.github.com/users/" + user_name).then(res => pro(res));
}

fun()

// add event listener for enter key for fun()
document.getElementById('input').addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        fun();
    }
});
