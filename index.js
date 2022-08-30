// Sad, github api recives

var HISTORY = new Array();

const messageDiv = document.getElementById('message')
const outputDiv = document.getElementById('output');

function sleep(ms) {
    console.log('Sleeping for ' + ms / 1000 + ' seconds')
    return new Promise(resolve => setTimeout(resolve, ms));
}

function update_page(res, bluff_call=false) {
    console.log(res);
    let error = res.login == undefined
    if (error) {
        console.warn("error: something went wrong")

        // errorDiv.style.visibility = 'visible'; errorDiv.style.position = 'absolute';
        outputDiv.style.visibility = 'hidden'
        if (!bluff_call) {
            messageDiv.innerHTML = "Invalid Username"
        }
        return
    } else {
        HISTORY.push(res.login);
        // errorDiv.style.visibility = 'hidden'; errorDiv.style.position = 'relative';
        outputDiv.style.visibility = 'visible'
    }
    document.getElementById('avatar').src = res.avatar_url;

    if (res.name !== res.login) {
        document.getElementById('name').innerHTML = res.name;
        document.getElementById('login').innerHTML = res.login + ' <i id="login-link-icon" class="fa-solid fa-up-right-from-square"></i>';
        document.getElementById('login').href = res.html_url;
    } else {
        document.getElementById('name').innerHTML = res.login;
    }

    document.getElementById('followers').innerHTML = res.followers.toLocaleString("en-US");

    document.getElementById('following').innerHTML = res.following.toLocaleString("en-US");

    // get how many followers the user follow
    get(res.followers_url + "?per_page=100").then(followers => function(followers) {
        get("https://api.github.com/users/" + res.login + "/following?per_page=100").then(following => proccessFollowers(followers, following));
    }(followers));

    document.getElementById('public_repos').innerHTML = res.public_repos;
    
    document.getElementById('public_gists').innerHTML = res.public_gists;

    // create a time from res.created_at
    var date = new Date(res.created_at);
    // get the difference in months
    var total_months = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24 * 30));

    var years = Math.floor(total_months / 12);
    var months = total_months % 12;

    if (years) {message = years + ' years and ' + months + ' months';} else {message = months + ' months';}
    document.getElementById('created').innerHTML = (error) ? '' : "Account created " + message + " ago";
}

function proccessFollowers(followers, following) {
    document.getElementById('ff').innerHTML = 'loading';
    sleep(1000)
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
    document.getElementById('ff').innerHTML = ff.toLocaleString("en-US");
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
    
    if (user_name) {
        get("https://api.github.com/users/" + user_name).then(res => update_page(res));
        return Number(res.login == undefined)
    } else {
        update_page({}, bluff_call=true);
    }
}

fun()

// add event listener for enter key for fun()
document.getElementById('input').addEventListener('keyup', function(e) {
    console.log("ku")

    user_name = document.getElementById('input').value;

    if (user_name) {
        messageDiv.innerHTML = "Press Enter to get profile"
    } else {
        messageDiv.innerHTML = ""
    }

    if (e.keyCode == 13) {  // enter key
        fun();
    }
});
