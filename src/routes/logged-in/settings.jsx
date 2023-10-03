import '../../App.css';
import LeftNav from '../../components/left-nav';
import SettingsView from '../../components/settings';

function Settings() {
  return (
    <div className="App Auth Settings">
      <LeftNav/>
      <SettingsView/>
    </div>
  );
}

export default Settings;
