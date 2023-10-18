import logo from '../img/logo.png';
import background from '../img/bg.jpg';
import '../App.css';
import {Link} from "react-router-dom";

const ImportCss = () => { import('../Safari.css'); }
function BrowserSafari() {
  const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                   navigator.userAgent &&
                   navigator.userAgent.indexOf('CriOS') == -1 &&
                   navigator.userAgent.indexOf('FxiOS') == -1;
  return (
    <>
      {isSafari && <ImportCss/>}
    </>
  );
}

export default BrowserSafari;
