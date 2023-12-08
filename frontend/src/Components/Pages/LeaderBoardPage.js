import { clearPage,renderPageTitle  } from '../../utils/render';

const leaderboardData = [
  { rank: 1, name: 'Lucas The Goat', score: 200 },
  { rank: 2, name: 'Raf the sheep', score: 190 },
  { rank: 3, name: 'Nate the rat', score: 130 },
  // Add more data as needed
];

const LeaderBoardPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderLeaderBoardPage();

  };

function renderLeaderBoardPage() {
    const main = document.querySelector('main');
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
            ${leaderboardData.map(player => `
                <tr>
                    <td>${player.rank}</td>
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
  };

  export default LeaderBoardPage;