import '../../App.css';
import LeftNav from '../../components/left-nav';
import HomeView from '../../components/home-view';

function Home() {
  return (
    <div className="App Auth">
      <LeftNav/>
      <HomeView/>
    </div>
  );
}

export default Home;
