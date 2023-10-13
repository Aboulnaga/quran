import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faCircleMinus } from "@fortawesome/free-solid-svg-icons"

function AddAndREmoveSwarInFavListLocalStorage({
  favListState,
  setFavListState,
  sorah,
  // setIsInPlayList,
}) {
  const mySurahID = sorah.sora_id

  // checkIsThisSurahInLocalStorage()
  // console.log(checkIsThisSurahInLocalStorage())

  const addSwraToLocalStorageFromUser = () => {
    const favListStorage = { shyID: sorah.sh_id, sID: sorah.sora_id }
    // console.log(playListStorage)
    const newPlayListStorage = [...favListState, favListStorage]
    setFavListState(newPlayListStorage)
    localStorage.setItem("QuranFavList", JSON.stringify(newPlayListStorage))
  }

  const removeSwraFRomLocalStorageFromUser = () => {
    const filterFavList = favListState
      .filter(stateSora => {
        return stateSora.sID !== sorah.sora_id
      })
      .flat()

    localStorage.setItem("QuranFavList", JSON.stringify(filterFavList))
    setFavListState(JSON.parse(localStorage.getItem("QuranFavList")))
  }

  const checkIsThisSurahInLocalStorage = () => {
    const isInFavListLocalStorage = favListState
      .map(res => res.sID)
      .includes(mySurahID)

    return isInFavListLocalStorage
  }

  return (
    <React.Fragment>
      {checkIsThisSurahInLocalStorage() === false ? (
        <div
          onClick={addSwraToLocalStorageFromUser}
          className="swra-add-to-fav-list"
        >
          <FontAwesomeIcon
            className="swra-add-to-fav-list__icon"
            icon={faHeart}
          />
        </div>
      ) : null}

      {checkIsThisSurahInLocalStorage() === true ? (
        <div
          onClick={removeSwraFRomLocalStorageFromUser}
          className="swra-remove-from-fav-list"
        >
          <FontAwesomeIcon
            className="swra-remove-from-fav-list__icon"
            icon={faCircleMinus}
          />
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default AddAndREmoveSwarInFavListLocalStorage

{
  /*


  add

  import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

function AddSwraToPlayListStorage({
  playListState,
  setPlayListState,
  sorah,
  // setIsInPlayList,
}) {
  const [isInPlayList, setIsInPlayList] = useState(false)
  console.log(isInPlayList)
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





REmove

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

function RemoveSwraFromPlayListStorage({
  playListState,
  setPlayListState,
  sorah,
  setIsInPlayList,
}) {
  const getSwraFromUser = () => {
    setIsInPlayList(false)
    const filterPlayList = playListState
      .filter(stateSora => {
        return stateSora.sID !== sorah.sora_id
      })
      .flat()

    localStorage.setItem("QuranPlayList", JSON.stringify(filterPlayList))
    setPlayListState(JSON.parse(localStorage.getItem("QuranPlayList")))

    // const playListStorage = { shyID: sorah.sh_id, sID: sorah.sora_id }
    // console.log(playListStorage)
    // const newPlayListStorage = [...playListState, playListStorage]
    // setPlayListState(newPlayListStorage)
    // console.log(playListState)
    // console.log(newPlayListStorage)
    // localStorage.setItem("QuranPlayList", JSON.stringify(newPlayListStorage))
  }
  return (
    <div onClick={getSwraFromUser} className="swra-remove-from-play-list">
      <FontAwesomeIcon
        className="swra-remove-from-play-list__icon"
        icon={faBookmark}
      />
    </div>
  )
}

export default RemoveSwraFromPlayListStorage



check 

 const IsThisSurahInLocalStorage = () => {
    const inPlayListStorage = playListState.map(surahInPlayListStorage => {
      if (surahInPlayListStorage.sID === sorah.sora_id) {
        return true
      } else {
        return false
      }
    })

    isInPlayList ? () => setIsInPlayList(true) : () => setIsInPlayList(false)
  }

  IsThisSurahInLocalStorage()


*/
}
