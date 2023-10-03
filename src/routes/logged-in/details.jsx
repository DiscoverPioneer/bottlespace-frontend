import '../../App.css';
import LeftNav from '../../components/left-nav';
import DetailsView from '../../components/details';

function Home() {
  return (
    <div className="App Auth">
      <LeftNav/>
      <DetailsView/>
    </div>
  );
}

export default Home;
