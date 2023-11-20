import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import NewPage from '../Pages/NewPage';
import QuizzPage from '../Pages/QuizzPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderBoardPage from '../Pages/LeaderBoardPage';


const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/quizz': QuizzPage,
  '/login':LoginPage,
  '/register':RegisterPage,
  '/leaderboard':LeaderBoardPage
};

export default routes;
