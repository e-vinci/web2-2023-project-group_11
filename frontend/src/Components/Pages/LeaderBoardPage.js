import { clearPage, renderPageTitle } from '../../utils/render';

const dataNonTrie = await fetchUsers();
const leaderboardData = dataNonTrie.sort(
  ((a, b) =>
    (a.score / a.nbPartie === 0 ? 1 : a.nbPartie) - (b.score / b.nbPartie === 0 ? 1 : b.nbPartie)),
);
async function fetchUsers() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
  return [];

}
const LeaderBoardPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderLeaderBoardPage();
};

function renderLeaderBoardPage() {
  const main = document.querySelector('main');
  let rank = 0;
  main.innerHTML = `
    <table class="leaderboard">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            ${leaderboardData
              .map((player) => {
                rank += 1;
                return `
                <tr>
                    <td>${rank}</td>
                    <td>${player.name}</td>
                    <td>${player.score / player.nbPartie === 0 ? 1 : player.nbPartie}</td>
                </tr>
            `;
              })
              .join('')}
        </tbody>
    </table>`;
}

export default LeaderBoardPage;
