import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"

export const QuranInfo = ({ swraINFO, shaykhINFO, whatIsTheListNow }) => {
  // console.log(shaykhINFO)
  // console.log(swraINFO)
  const [openSettingsWindow, setOpenSettingsWindow] = useState(false)
  const [restData, setResetData] = useState(false)

  const list = () => {
    if (whatIsTheListNow === "Fav") {
      return "FavList"
    } else if (whatIsTheListNow === "PlayList") {
      return "Playlist"
    } else {
      return "Library"
    }
  }
  return (
    <React.Fragment>
      <div className="quran-info">
        <div className="quran-info_info">
          <div className="quran-info_info__nav">
            <div className="quran-info_info__list">
              <p> {list() + " >>"} </p>
            </div>
            <div className="quran-info_info__shaykh">
              <p> {shaykhINFO.shaykh + " >>"} </p>
            </div>
            <div className="quran-info_info__surah">
              <p> {swraINFO.soret} </p>
            </div>
          </div>

          <div
            onClick={() => {
              setOpenSettingsWindow(!openSettingsWindow)
            }}
            className="quran-info__settings"
          >
            <FontAwesomeIcon
              className="quran-info__settings__rest-btn"
              icon={faGear}
            />
          </div>

          {openSettingsWindow ? (
            <div
              className={`quran-info__settings-reset-window ${
                openSettingsWindow
                  ? "show__quran-info__settings-reset-window"
                  : ""
              }`}
            >
              <div className="quran-info__settings-reset-window__data">
                <button
                  onClick={() => {
                    localStorage.clear()
                    setOpenSettingsWindow(false)
                    window.location.reload()
                  }}
                >
                  Reset Data
                </button>
                <p>
                  this option will delete all your stored lists (favList,
                  PlayList)
                </p>
              </div>
              <div
                onClick={() => {
                  setOpenSettingsWindow(!openSettingsWindow)
                }}
                className="quran-info__settings-reset-window__close-button"
              >
                <h1>X</h1>
              </div>
            </div>
          ) : null}
        </div>
        <div className="quran-info_img">
          <img src={shaykhINFO.img} alt={shaykhINFO.shaykh} />
        </div>
      </div>
    </React.Fragment>
  )
}
