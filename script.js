const apiURL = 'https://api.github.com/users/';

async function userGetFunction() {
    const username = document.getElementById('searchInput').value;
    try {
        const response = await axios.get(`${apiURL}${username}`);
        const userData = response.data;
        userCard(userData);
        repoGetFunction(username);
    } catch (error) {
        document.getElementById('profileCard').innerHTML = `<p>User not found</p>`;
        document.getElementById('repoCard').innerHTML = '';
    }
}

async function repoGetFunction(username) {
    try {
        const response = await axios.get(`${apiURL}${username}/repos?per_page=5`);
        const repos = response.data;
        repoCardFunction(repos);
    } catch (error) {
        document.getElementById('repoCard').innerHTML = `<p>Error fetching repositories</p>`;
    }
}

function userCard(userData) {
    document.getElementById('profileCard').innerHTML = `
        <img src="${userData.avatar_url}" alt="${userData.login}'s avatar">
        <h2>${userData.name || userData.login}</h2>
        <p>${userData.bio || ''}</p>
        <p>Followers: ${userData.followers}</p>
        <p>Following: ${userData.following}</p>
        <p>Public Repos: ${userData.public_repos}</p>
    `;
}

function repoCardFunction(repos) {
    let repoHTML = '';
    repos.forEach(repo => {
        repoHTML += `
            <div class="repo">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <span>⭐ ${repo.stargazers_count}</span>
            </div>
        `;
    });
    document.getElementById('repoCard').innerHTML = repoHTML;
}
