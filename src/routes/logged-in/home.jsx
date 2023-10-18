import '../../App.css';
import LeftNav from '../../components/left-nav';
import HomeView from '../../components/home-view';
import BrowserSafari from '../../components/browser-safari';

function Home() {
  return (
    <div className="App Auth">
      <LeftNav/>
      <HomeView/>
      <BrowserSafari/>
    </div>
  );
}

export default Home;
