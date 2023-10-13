import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import AddAndREmoveSwarInFavListLocalStorage from "../Common/AddAndREmoveSwarInFavListLocalStorage/AddAndREmoveSwarInFavListLocalStorage"
import AddAndREmoveSwarInPlayListLocalStorage from "../Common/AddAndREmoveSwarInPlayListLocalStorage/AddAndREmoveSwarInPlayListLocalStorage"
export const PlayList = ({
  audioREF,
  setCurrentSwra,
  swar,
  isPlayingSound,
  currentSwra,
  shaykh,
  playListState,
  setPlayListState,
  favListState,
  setFavListState,
  setWhatIsTheListNow,
  currentListInQuranPlayer,
  soundTimeInfo,
  setSoundTimeInfo,
  whatIsTheListNow,
}) => {
  //   console.log(swar)

  const getSuarhInfo = eachSurahInPlayList => {
    const newFilterArray = swar.filter(s => {
      if (eachSurahInPlayList.sID === s.sora_id) {
        return s
      }
    })
    return newFilterArray[0]
  }

  const getShaykhINFO = eachSurahInPlayList => {
    return shaykh.filter(s => {
      if (eachSurahInPlayList.shyID === s.sh_id) {
        return s
      }
    })[0]
  }

  const handelCurrentSurahInQuranPlayer = (surahINFO, index) => {
    setWhatIsTheListNow("PlayList")
    setCurrentSwra({ shID: surahINFO.sh_id, swraID: surahINFO.sora_id })
    const playSoundPromise = audioREF.current.play()
    if (!isPlayingSound) {
      audioREF.current.pause()
    } else {
      playSoundPromise.then(audio => audioREF.current.play())
    }
  }

  // useEffect(() => {
  //   return () => {
  //     console.log("end")
  //     console.log(currentSwra)
  //     audioREF.current.pause()
  //   }
  // }, [currentSwra])

  return (
    <div className="play-list-container">
      <h3>Play List</h3>

      <React.Fragment>
        {playListState.map((eachSurahInPlayList, index) => {
          const surahINFO = getSuarhInfo(eachSurahInPlayList)
          const shaykhINFO = getShaykhINFO(eachSurahInPlayList)

          return (
            <div
              key={index}
              className={`play-list__swar ${
                currentSwra.swraID === surahINFO.sora_id
                  ? "play-list__swar__choosen"
                  : ""
              }`}
            >
              <div
                onClick={() =>
                  handelCurrentSurahInQuranPlayer(surahINFO, index)
                }
                className="play-list__swar__on-click-play-quran"
              >
                <div className="play-list__swar__left-play-btn">
                  <FontAwesomeIcon
                    className="play-list__swar__left-play-btn__icon"
                    icon={
                      currentSwra.swraID === surahINFO.sora_id && isPlayingSound
                        ? faPause
                        : faPlay
                    }
                  />
                </div>
                <div className="play-list__swar__info">
                  <h3>{surahINFO.soret}</h3>
                  <p className="play-list__swar__info__light">
                    {surahINFO.soret_ar}
                  </p>
                  <p className="play-list__swar__info__light">
                    {shaykhINFO.shaykh}
                  </p>
                  <p className="play-list__swar__info__light">
                    {shaykhINFO.shaykh_ar}
                  </p>
                </div>
              </div>
              <div className="play-list__swar__controls">
                <div className="play-list__swar__play-list">
                  <AddAndREmoveSwarInFavListLocalStorage
                    sorah={surahINFO}
                    favListState={favListState}
                    setFavListState={setFavListState}
                  />
                </div>
                <div className="play-list__swar__play-list">
                  <AddAndREmoveSwarInPlayListLocalStorage
                    sorah={surahINFO}
                    playListState={playListState}
                    setPlayListState={setPlayListState}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </React.Fragment>
    </div>
  )
}
