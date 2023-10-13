import React from "react"
import { SwarMenu } from "./SwarMenu"
export const ShaykhMenu = ({
  audioREF,
  isPlayingSound,
  currentSwraID,
  data,
  setCurrentSwra,
  favListState,
  setFavListState,
  playListState,
  setPlayListState,
  whatIsTheListNow,
  setWhatIsTheListNow,
}) => {
  // const [isInPlayList, setIsInPlayList] = useState(false)

  //   console.log(data)

  return (
    <div className="main-menu">
      <h1>Library</h1>
      {data.map((data, i) => {
        return (
          <div key={i} className="shaykh-menu">
            <div className="shaykh-data">
              <div className="shaykh-img">
                <img src={data.img} alt={data.shaykh} />
              </div>
              <div className="shaykh-info">
                <h3>{data.shaykh}</h3>
                <p>
                  {data.shaykh_ar} ({data.sound.length})
                </p>
              </div>
            </div>
            {/* swar list component */}
            <div className="swar-menu">
              {data.sound.map(sound => {
                return (
                  <React.Fragment key={sound.sora_id}>
                    <SwarMenu
                      audioREF={audioREF}
                      isPlayingSound={isPlayingSound}
                      swar={sound}
                      setCurrentSwra={setCurrentSwra}
                      currentSwraID={currentSwraID}
                      playListState={playListState}
                      setPlayListState={setPlayListState}
                      favListState={favListState}
                      setFavListState={setFavListState}
                      whatIsTheListNow={whatIsTheListNow}
                      setWhatIsTheListNow={setWhatIsTheListNow}
                    />
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
