import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import AddAndREmoveSwarInPlayListLocalStorage from "../Common/AddAndREmoveSwarInPlayListLocalStorage/AddAndREmoveSwarInPlayListLocalStorage"
import AddAndREmoveSwarInFavListLocalStorage from "../Common/AddAndREmoveSwarInFavListLocalStorage/AddAndREmoveSwarInFavListLocalStorage"

export const SwarMenu = ({
  swar,
  setCurrentSwra,
  audioREF,
  isPlayingSound,
  currentSwraID,
  favListState,
  setFavListState,
  playListState,
  setPlayListState,
  whatIsTheListNow,
  setWhatIsTheListNow,
}) => {
  const [isLocal, setIslocal] = useState(false)
  const [isInPlayList, setIsInPlayList] = useState(false)

  // console.log(isInPlayList)

  const getSwraId = e => {
    setWhatIsTheListNow("Library")
    // console.log(e.target)
    // console.log(swar.sora_id, swar.sh_id)
    setCurrentSwra({ shID: swar.sh_id, swraID: swar.sora_id })
    // console.log(isPlayingSound)
    // console.log(audioREF.current)
    // isPlayingSound && console.log(audioREF.current)

    const playPromise = audioREF.current.play()
    audioREF.current.pause()
    isPlayingSound
      ? playPromise.then(audio => audioREF.current.play())
      : playPromise.then(audio => audioREF.current.pause())
  }

  const doChangePlayIcon = () => {
    // console.log(swar)
    // console.log(currentSwraID)

    if (isPlayingSound && currentSwraID === swar.sora_id) {
      return <FontAwesomeIcon className="swra-play-icon__icon" icon={faPause} />
    }

    return <FontAwesomeIcon className="swra-play-icon__icon" icon={faPlay} />
  }

  const activeSwraInPlayer = () => {
    return (
      isPlayingSound &&
      currentSwraID === swar.sora_id &&
      "active-swra-in-player"
    )
  }

  // console.log(swar) ${activeSwraInPlayer()}
  return (
    <div className={`swra-det ${activeSwraInPlayer()} `}>
      <div className="swra-det__wrap" onClick={getSwraId}>
        <div className="swra-play-icon">{doChangePlayIcon()}</div>
        <div className="swra-info">
          <p className="swra-en">{swar.soret}</p>
          <p className="swra-ar">{swar.soret_ar}</p>
        </div>
      </div>

      <div className="swra-det__controles">
        <AddAndREmoveSwarInFavListLocalStorage
          favListState={favListState}
          setFavListState={setFavListState}
          sorah={swar}
        />
        <AddAndREmoveSwarInPlayListLocalStorage
          playListState={playListState}
          setPlayListState={setPlayListState}
          sorah={swar}
        />
      </div>
    </div>
  )
}

/*

export const SwarMenu = ({ swar, setCurrentSwra }) => {
  //   console.log(PlayIcon)
  const attrRef = useRef(null)
  const GetShaykhAndSwraID = () => {
    // console.log(attrRef.current.parentElement.getAttribute("sh-id"))
    const shID = attrRef.current.parentElement.getAttribute("sh-id")
    const swraID = attrRef.current.parentElement.getAttribute("swra-id")
    setCurrentSwra({ shID: shID, swraID: swraID })
  }

  return (
    <div className="swra-det" sh-id={swar.sh_id} swra-id={swar.sora_id}>
      <div
        onClick={GetShaykhAndSwraID}
        ref={attrRef}
        className="swra-det__wrap"
      >
        <div className="swra-play-icon">
          <FontAwesomeIcon className="swra-play-icon__icon" icon={faPlay} />
        </div>
        <div className="swra-info">
          <p className="swra-en">{swar.soret}</p>
          <p className="swra-ar">{swar.soret_ar}</p>
        </div>
      </div>

      <div className="swra-add-to-fav">
        <FontAwesomeIcon className="swra-add-to-fav__icon" icon={faHeart} />
      </div>

      <div className="swra-add-to-play-list">
        <FontAwesomeIcon
          className="swra-add-to-play-list__icon"
          icon={faPlus}
        />
      </div>
    </div>
  )
}


 const playPromise = audioREF.current.play()
    if (isPlayingSound) {
      if (playPromise != undefined) {
        playPromise.then(audio => audioREF.current.play())
      }
    }

    <CheckLocalStorageForFavList
          favListState={favListState}
          setFavListState={setFavListState}
          isLocal={isLocal}
          setIslocal={setIslocal}
          swar={swar}
        />


*/
