import '../../App.css';
import LeftNav from '../../components/left-nav';
import View from '../../components/upload-business-photos';
// TODO: import BrowserSafari from '../../components/browser-safari';

function UploadBusinessPhotos() {
  return (
    <div className="App Auth">
      <LeftNav/>
      <View/>
    </div>
  );
}

export default UploadBusinessPhotos;
