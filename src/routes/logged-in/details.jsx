import '../../App.css';
import LeftNav from '../../components/left-nav';
import DetailsView from '../../components/details';
import BrowserSafari from '../../components/browser-safari';

function Home() {
  return (
    <div className="App Auth Details">
      <LeftNav/>
      <DetailsView/>
      <BrowserSafari/>
    </div>
  );
}

export default Home;
