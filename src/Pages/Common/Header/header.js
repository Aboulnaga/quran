import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faBars, faHeart } from "@fortawesome/free-solid-svg-icons"
export const Header = ({
  isPlayList,
  setIsPlayList,
  isLibrary,
  setIsLibrary,
  isFavOpend,
  setIsFavOpend,
  swar,
  setCurrentSwra,
  audioREF,
  isPlayingSound,
  currentSwra,
  playListState,
  favListState,
}) => {
  // funcations start

  //return
  return (
    <div className="header-container">
      <header>
        <h1>
          <a href="./index.html">Qurany</a>
        </h1>

        <nav>
          {favListState && favListState.length > 0 ? (
            <div
              onClick={() => {
                setIsLibrary(false)
                setIsPlayList(false)
                setIsFavOpend(!isFavOpend)
              }}
              className={`fav ${
                isFavOpend ? "on-press-button-back-ground" : ""
              }`}
            >
              <p>fav</p>
              <FontAwesomeIcon className="fav__icon" icon={faHeart} />
            </div>
          ) : null}
          {playListState && playListState.length > 0 ? (
            <div
              onClick={() => {
                setIsLibrary(false)
                setIsPlayList(!isPlayList)
                setIsFavOpend(false)
              }}
              className={`play-list ${
                isPlayList ? "on-press-button-back-ground" : ""
              }`}
            >
              <p>Play List</p>
              <FontAwesomeIcon className="play-list__icon" icon={faBookmark} />
            </div>
          ) : null}
          <div
            onClick={() => {
              setIsLibrary(!isLibrary)
              setIsPlayList(false)
              setIsFavOpend(false)
            }}
            className={`library ${
              isLibrary ? "on-press-button-back-ground" : ""
            }`}
          >
            <p>Library</p>
            <FontAwesomeIcon className="library__icon" icon={faBars} />
          </div>
        </nav>
      </header>
    </div>
  )
}

/*


import React, { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark, faBars } from "@fortawesome/free-solid-svg-icons"
export const Header = () => {
  function AddButtonBackGroundColor(e) {
    e.target.classList.add("on-press-button-back-ground")
  }
  function RemoveButtonBackGroundColor(e) {
    e.target.classList.remove("on-press-button-back-ground")
  }

  // let [isPlayListPressed, setIsPlayListPressed] = useState(false)
  let [isPlay, setIsPlay] = useState(false)
  let [isLibrary, setIsLibrary] = useState(false)
  // console.log(isPlay)
  // console.log(isLibrary)

  const GetPlayList = e => {
    setIsLibrary(false)
    setIsPlay(true)

    const target = e.target.classList

    return target
  }

  function doChange(GetPlayList) {
    const target = GetPlayList
    console.log(isPlay)
    console.log(isLibrary)
    console.log(target)

    if (isPlay === true) {
      target.add("on-press-button-back-ground")
    }

    if (isPlay === false) {
      target.remove("on-press-button-back-ground")
    }
  }

  function GetLibrary(e) {
    // setIsPlayListPressed(false)
    // setIsLibraryPressed(true)

    setIsPlay(false)
    setIsLibrary(true)
    console.log(isPlay)
    console.log(isLibrary)
    if (isLibrary === true) {
      AddButtonBackGroundColor(e)
    }

    if (isLibrary === false) {
      RemoveButtonBackGroundColor(e)
    }
  }

  return (
    <div className="header-container">
      <header>
        <h1>
          <a href="./index.html">Quran</a>
        </h1>

        <nav>
          <div onClick={GetPlayList} className="play-list">
            <FontAwesomeIcon className="play-list__icon" icon={faBookmark} />
          </div>
          <div onClick={GetLibrary} className="library">
            <FontAwesomeIcon className="library__icon" icon={faBars} />
          </div>
        </nav>
      </header>
    </div>
  )
}



*/
