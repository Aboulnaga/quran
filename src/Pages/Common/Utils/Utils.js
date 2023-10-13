import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

const [isInPlayList, setIsInPlayList] = useState(false)

export const Adds = (
  playListState,
  setPlayListState,
  sorah,
  setIsInPlayList
) => {
  const getSwraFromUser = () => {
    setIsInPlayList(true)

    const playListStorage = { shyID: sorah.sh_id, sID: sorah.sora_id }
    // console.log(playListStorage)
    const newPlayListStorage = [...playListState, playListStorage]
    setPlayListState(newPlayListStorage)
    localStorage.setItem("QuranPlayList", JSON.stringify(newPlayListStorage))
  }
  return (
    <div onClick={getSwraFromUser} className="swra-add-to-play-list">
      <FontAwesomeIcon
        className="swra-add-to-play-list__icon"
        icon={faBookmark}
      />
    </div>
  )
}
