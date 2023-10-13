import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import AddAndREmoveSwarInFavListLocalStorage from "../Common/AddAndREmoveSwarInFavListLocalStorage/AddAndREmoveSwarInFavListLocalStorage"
import AddAndREmoveSwarInPlayListLocalStorage from "../Common/AddAndREmoveSwarInPlayListLocalStorage/AddAndREmoveSwarInPlayListLocalStorage"
export const FavList = ({
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
  whatIsTheListNow,
  setWhatIsTheListNow,
}) => {
  //   console.log(swar)

  const getSuarhInfo = eachSurahInFavList => {
    return swar.filter(s => {
      if (eachSurahInFavList.sID === s.sora_id) {
        return s
      }
    })[0]
  }

  const getShaykhINFO = eachSurahInFavList => {
    return shaykh.filter(s => {
      if (eachSurahInFavList.shyID === s.sh_id) {
        return s
      }
    })[0]
  }

  const handelCurrentSurahInQuranPlayer = surahINFO => {
    setWhatIsTheListNow("Fav")
    setCurrentSwra({ shID: surahINFO.sh_id, swraID: surahINFO.sora_id })
    const playSoundPromise = audioREF.current.play()
    if (isPlayingSound === false) {
      audioREF.current.pause()
    } else {
      playSoundPromise.then(audio => audioREF.current.play())
    }
  }

  return (
    <div className="fav-list-container">
      <h3>Fav List</h3>

      <React.Fragment>
        {favListState.map((eachSurahInFavList, index) => {
          const surahINFO = getSuarhInfo(eachSurahInFavList)
          const shaykhINFO = getShaykhINFO(eachSurahInFavList)

          return (
            <div
              key={index}
              className={`fav-list__swar ${
                currentSwra.swraID === surahINFO.sora_id
                  ? "fav-list__swar__choosen"
                  : ""
              }`}
            >
              <div
                onClick={() => handelCurrentSurahInQuranPlayer(surahINFO)}
                className="fav-list__swar__on-click-play-quran"
              >
                <div className="fav-list__swar__left-play-btn">
                  <FontAwesomeIcon
                    className="fav-list__swar__left-play-btn__icon"
                    icon={
                      currentSwra.swraID === surahINFO.sora_id && isPlayingSound
                        ? faPause
                        : faPlay
                    }
                  />
                </div>
                <div className="fav-list__swar__info">
                  <h3>{surahINFO.soret}</h3>
                  <p className="fav-list__swar__info__light">
                    {surahINFO.soret_ar}
                  </p>
                  <p className="fav-list__swar__info__light">
                    {shaykhINFO.shaykh}
                  </p>
                  <p className="fav-list__swar__info__light">
                    {shaykhINFO.shaykh_ar}
                  </p>
                </div>
              </div>
              <div className="fav-list__swar__controls">
                <div className="fav-list__swar__fav-list">
                  <AddAndREmoveSwarInFavListLocalStorage
                    sorah={surahINFO}
                    favListState={favListState}
                    setFavListState={setFavListState}
                  />
                </div>
                <div className="fav-list__swar__play-list">
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
