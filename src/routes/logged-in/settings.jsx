import '../../App.css';
import LeftNav from '../../components/left-nav';
import SettingsView from '../../components/settings';
import BrowserSafari from '../../components/browser-safari';

function Settings() {
  return (
    <div className="App Auth Settings">
      <LeftNav/>
      <SettingsView/>
      <BrowserSafari/>
    </div>
  );
}

export default Settings;
