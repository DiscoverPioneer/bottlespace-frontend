import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import CheckIns from "./check-ins";
import ClickThrus from "./click-thrus";
import Tile from "./tile";
import MobilePreview from "./mobile-preview";
import { AuthService } from "../services/apiService";

const IMAGES_MOCK = [
  {
    id: 1,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2c%2Fa2%2F77%2F2ca27732d77eb6fef5a63b10e02a52db.jpg&f=1&nofb=1&ipt=9a0bafe6918d0f17dff6fcf27af1f0e14a366d88429c561dd306b0834fc26af2&ipo=images",
    actual_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2c%2Fa2%2F77%2F2ca27732d77eb6fef5a63b10e02a52db.jpg&f=1&nofb=1&ipt=9a0bafe6918d0f17dff6fcf27af1f0e14a366d88429c561dd306b0834fc26af2&ipo=images",
    order_index: 0,
  },
  {
    id: 2,
    thumbnail_src:
    "https://d3hjzzsa8cr26l.cloudfront.net/6a0fcd78-1a69-11ea-98fc-b960ad360eca.jpg?zcw=436&zch=436&zct=0&zcl=146",
    actual_src:
    "https://d3hjzzsa8cr26l.cloudfront.net/6a0fcd78-1a69-11ea-98fc-b960ad360eca.jpg?zcw=436&zch=436&zct=0&zcl=146",
    order_index: 1,
  },
  {
    id: 3,
    thumbnail_src:
    "https://d3hjzzsa8cr26l.cloudfront.net/fa8a44fc-1a76-11ea-b0c0-29b77ee52ea5.jpg?zcw=900&zch=900&zct=0&zcl=24",
    actual_src:
    "https://d3hjzzsa8cr26l.cloudfront.net/fa8a44fc-1a76-11ea-b0c0-29b77ee52ea5.jpg?zcw=900&zch=900&zct=0&zcl=24",
    order_index: 2,
  },
  {
    id: 3,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feeep.app%2Fwp-content%2Fuploads%2F2020%2F08%2FPLEASE-DONT-TELL-NEW-YORK-DESKTOP-1.jpg&f=1&nofb=1&ipt=c94dcbc54e6b6706b5fe814c1f0423bb27ba28287eeaa2f1b2d8bc9334374862&ipo=images",
    actual_src:
      "https://d3hjzzsa8cr26l.cloudfront.net/78da655a-0a9a-11e8-b378-d574cd6a6f29.jpg",
    order_index: 2,
  },
  {
    id: 3,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F33%2F8a%2F27%2F338a27591d3f894d8c2fd97332ecb4cd.jpg&f=1&nofb=1&ipt=06dabae3ef25796e606d69c13e1a4e101415f24e3472bb10a3501d20300309d1&ipo=images",
    actual_src:
      "https://d3hjzzsa8cr26l.cloudfront.net/78da655a-0a9a-11e8-b378-d574cd6a6f29.jpg",
    order_index: 2,
  },
  {
    id: 3,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F15%2F0a%2F1b%2F47%2Fphoto0jpg.jpg&f=1&nofb=1&ipt=282da5fd8178223d24050359ab61b71ea52284f66aa57ee170a84bbb09adc45c&ipo=images",
    actual_src:
      "https://d3hjzzsa8cr26l.cloudfront.net/78da655a-0a9a-11e8-b378-d574cd6a6f29.jpg",
    order_index: 2,
  },
  {
    id: 3,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F12%2F34%2F47%2Ff4%2Fphoto0jpg.jpg&f=1&nofb=1&ipt=0482bf5676356161251745ba3052d2668307e5d33afe1b2869fc3b34709de7ab&ipo=images",
    actual_src:
      "https://d3hjzzsa8cr26l.cloudfront.net/78da655a-0a9a-11e8-b378-d574cd6a6f29.jpg",
    order_index: 2,
  },
  {
    id: 3,
    thumbnail_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.barbizmag.com%2Fwp-content%2Fuploads%2F2021%2F06%2Fpdt1.jpg&f=1&nofb=1&ipt=f2927ab79f2693032289451cd5f6b17bccbf831eb2dab6aefa2e1cc157425ae0&ipo=images",
    actual_src:
      "https://d3hjzzsa8cr26l.cloudfront.net/78da655a-0a9a-11e8-b378-d574cd6a6f29.jpg",
    order_index: 2,
  },
];
function ImageGallery() {
  console.debug(JSON.stringify(AuthService));
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter, setTaskCounter] = useState("3 tasks");
  const [showThird, setShowThird] = useState(false);
  const { GetHomeDashboard, currentUser, UploadBusinessPhoto } = AuthService;
  const [loading, setLoading] = useState(true);
  const [userUploadToken, setUserUploadToken] = useState(null);
  const businessPhoto = useRef();
  const [images, setImages] = useState(IMAGES_MOCK);
  const submitBusinessPhoto = async (e) => {
    e.preventDefault();
    console.debug(businessPhoto.current);
    let form = new FormData();
    form.append("file", businessPhoto.current.files[0]);
    UploadBusinessPhoto(currentUser.establishment, form)
      .then((response) => {
        console.debug({ response });
      })
      .catch((err) => {
        console.error({ err });
      });
  };
  useEffect(() => {
    setLoading(true);
    console.debug({ currentUser });
    GetHomeDashboard(currentUser.establishment)
      .then((resp) => {
        console.debug({ resp });
        /**
         * TODO: grab data from api
         */
        setShowSetupAccount(true);
        /**
         * TODO: grab business info from api
         */
        setBusinessName(`"PDT" Please Don't Tell`);

        /**
         * TODO: grab bar analytics from api
         */
        setShowBarAnalytics(true);

        /**
         * TODO: grab current setup tasks needed from api
         */
        setTaskCounter("View all 3 tasks");
        setLoading(false);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);
  return (
    <div className="ImageGallery">
      {images.length &&
        images.map((i) => (
          <div className="image-record">
            <div className="image-top">
              <img className="image-preview" src={i.thumbnail_src} />
            </div>
            <div className="image-bot">
              <button className="delete" dataImage={i.id}>
                Delete
              </button>
              <button className="set-as-profile" dataImage={i.id}>
                Set as Profile Picture
              </button>
              <button className="move-left" dataImage={i.id}>
                &lt;&lt;Move left
              </button>
              <button className="move-right" dataImage={i.id}>
                Move right&gt;&gt;
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ImageGallery;
