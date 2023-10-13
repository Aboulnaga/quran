import React, { useState, useRef, useEffect } from "react"
import "./style/App.scss"
import { ShaykhMenu } from "./Pages/Library/shaykhMenu"
import { QuranInfo } from "./Pages/Common/QuranPlayer/QuranInfo"
import { QuranPlayer } from "./Pages/Common/QuranPlayer/QuranPlayer"
import { Header } from "./Pages/Common/Header/header"
import { Footer } from "./Pages/Common/Footer/footer"
import Database from "./DataBase/database"
import { FavList } from "./Pages/FavList/favList"
import { PlayList } from "./Pages/PlayList/PlayList"

// app function
function App() {
  //database shortcut
  const data = Database()

  // group all swar
  const allSwar = data.map(data => data.sound).flat()
  const libraryList = allSwar

  // current swra in the player state
  const getCurrentSurrrahFromLocalStorage = JSON.parse(
    localStorage.getItem("currentSurrah")
  )

  const [currentSwra, setCurrentSwra] = useState(
    getCurrentSurrrahFromLocalStorage?.currentSwra || { shID: 1, swraID: 11 }
  )

  function getCurrentSwraFromUser(currentSwra) {
    const userSwra = allSwar.filter(s => {
      // console.log(swra)

      if (s.sora_id == currentSwra.swraID && s.sh_id == currentSwra.shID) {
        return s
      }
    })

    return userSwra
  }

  let currenShaykhID = currentSwra.shID

  function getCurrentShaykhFromUser(currenShaykhID) {
    const userShaykh = data.filter(shaykh => {
      if (shaykh.sh_id == currenShaykhID) {
        return shaykh
      }
    })

    return userShaykh[0]
  }

  // play list
  // get quran play list from local storage
  const GetQuranPlayListFromLocalStorage = JSON.parse(
    localStorage.getItem("QuranPlayList")
  )

  const [playListState, setPlayListState] = useState(
    GetQuranPlayListFromLocalStorage ? GetQuranPlayListFromLocalStorage : []
  )

  // fav list
  // get quran Fav list from local storage
  const GetQuranFavListFromLocalStorage = JSON.parse(
    localStorage.getItem("QuranFavList")
  )

  const [favListState, setFavListState] = useState(
    GetQuranFavListFromLocalStorage ? GetQuranFavListFromLocalStorage : []
  )

  // nav buttons toggle changed from Haeder component
  const [isPlayList, setIsPlayList] = useState(false)
  const [isLibrary, setIsLibrary] = useState(false)
  const [isFavOpend, setIsFavOpend] = useState(false)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const audioREF = useRef(null)
  const [whatIsTheListNow, setWhatIsTheListNow] = useState(
    getCurrentSurrrahFromLocalStorage?.whatIsTheListNow || "Library"
  )
  const [currentListInQuranPlayer, setCurrentListInQuranPlayer] =
    useState(libraryList)
  const [soundTimeInfo, setSoundTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  // console.log(keepCurrentSurrahInLocalStorage)

  const keepCurrentSurrahInLocalStorage = { currentSwra, whatIsTheListNow }
  localStorage.setItem(
    "currentSurrah",
    JSON.stringify(keepCurrentSurrahInLocalStorage)
  )

  const doFilterAllSwarList = listFromListState => {
    return listFromListState.map(surahInList => {
      const result = allSwar.filter(surah => surah.sora_id === surahInList.sID)
      return result[0]
    })
  }

  // setCurrentSwra(getCurrentSurrrahFromLocalStorage.currentSwra)
  // setWhatIsTheListNow(getCurrentSurrrahFromLocalStorage.whatIsTheListNow)

  // useEffect(() => {
  //   const getCurrentSurrrahFromLocalStorage = JSON.parse(
  //     localStorage.getItem("currentSurrah")
  //   )
  //   console.log(getCurrentSurrrahFromLocalStorage.currentSwra)
  //   console.log(getCurrentSurrrahFromLocalStorage.whatIsTheListNow)
  // }, [currentSwra])
  // setCurrentSwra(getCurrentSurrrahFromLocalStorage.currentSwra)

  // if (whatIsTheListNow === "Fav") {
  //   setCurrentListInQuranPlayer(doFilterAllSwarList(favListState))
  // } else if (whatIsTheListNow === "PlayList") {
  //   setCurrentListInQuranPlayer(doFilterAllSwarList(playListState))
  // } else {
  //   setCurrentListInQuranPlayer(libraryList)
  // }

  useEffect(() => {
    const changeListAsUserChoose = () => {
      if (whatIsTheListNow === "Fav") {
        return doFilterAllSwarList(favListState)
      } else if (whatIsTheListNow === "PlayList") {
        return doFilterAllSwarList(playListState)
      } else if (whatIsTheListNow === "Library") {
        return libraryList
      }
    }
    setCurrentListInQuranPlayer(changeListAsUserChoose())
  }, [whatIsTheListNow])

  // console.log(changeListAsUserChoose())

  //app function return
  return (
    <div className="App">
      <aside
        className={`${
          isLibrary || isFavOpend || isPlayList ? "active-aside" : ""
        }`}
      >
        {isLibrary && (
          <ShaykhMenu
            data={data}
            setCurrentSwra={setCurrentSwra}
            isLibrary={isLibrary}
            setIsLibrary={setIsLibrary}
            audioREF={audioREF}
            isPlayingSound={isPlayingSound}
            currentSwraID={currentSwra.swraID}
            playListState={playListState}
            setPlayListState={setPlayListState}
            favListState={favListState}
            setFavListState={setFavListState}
            whatIsTheListNow={whatIsTheListNow}
            setWhatIsTheListNow={setWhatIsTheListNow}
          />
        )}
        {isFavOpend && (
          <FavList
            audioREF={audioREF}
            setCurrentSwra={setCurrentSwra}
            swar={allSwar}
            isPlayingSound={isPlayingSound}
            currentSwra={currentSwra}
            shaykh={data}
            playListState={playListState}
            setPlayListState={setPlayListState}
            favListState={favListState}
            setFavListState={setFavListState}
            whatIsTheListNow={whatIsTheListNow}
            setWhatIsTheListNow={setWhatIsTheListNow}
          />
        )}

        {isPlayList ? (
          <PlayList
            audioREF={audioREF}
            setCurrentSwra={setCurrentSwra}
            swar={allSwar}
            isPlayingSound={isPlayingSound}
            currentSwra={currentSwra}
            shaykh={data}
            playListState={playListState}
            setPlayListState={setPlayListState}
            favListState={favListState}
            setFavListState={setFavListState}
            whatIsTheListNow={whatIsTheListNow}
            setWhatIsTheListNow={setWhatIsTheListNow}
            currentListInQuranPlayer={currentListInQuranPlayer}
            soundTimeInfo={soundTimeInfo}
            setSoundTimeInfo={setSoundTimeInfo}
          />
        ) : null}
      </aside>
      <main
        className={
          isLibrary || isFavOpend || isPlayList
            ? "main-if-aside-active"
            : "main-deactive-aside"
        }
      >
        <Header
          isPlayList={isPlayList}
          setIsPlayList={setIsPlayList}
          isLibrary={isLibrary}
          setIsLibrary={setIsLibrary}
          isFavOpend={isFavOpend}
          setIsFavOpend={setIsFavOpend}
          swar={allSwar}
          setCurrentSwra={setCurrentSwra}
          audioREF={audioREF}
          isPlayingSound={isPlayingSound}
          currentSwra={currentSwra}
          playListState={playListState}
          favListState={favListState}
        />
        <QuranInfo
          swraINFO={getCurrentSwraFromUser(currentSwra)[0]}
          shaykhINFO={getCurrentShaykhFromUser(currenShaykhID)}
          whatIsTheListNow={whatIsTheListNow}
        />
        <QuranPlayer
          audioREF={audioREF}
          isPlayingSound={isPlayingSound}
          setIsPlayingSound={setIsPlayingSound}
          swraINFO={getCurrentSwraFromUser(currentSwra)[0]}
          shaykhINFO={getCurrentShaykhFromUser(currenShaykhID)}
          currentSwra={currentSwra}
          setCurrentSwra={setCurrentSwra}
          currentList={currentListInQuranPlayer}
          whatIsTheListNow={whatIsTheListNow}
          soundTimeInfo={soundTimeInfo}
          setSoundTimeInfo={setSoundTimeInfo}
          playListState={playListState}
        />

        <Footer />
      </main>
    </div>
  )
}

export default App

{
  /*
const changeListAsUserChoose = () => {
    if (whatIsTheListNow === "Fav") {
      const list = doFilterAllSwarList(favListState)
      return setCurrentListInQuranPlayer(list)
    } else if (whatIsTheListNow === "PlayList") {
      return setCurrentListInQuranPlayer(doFilterAllSwarList(playListState))
    } else if (whatIsTheListNow === "Library") {
      return setCurrentListInQuranPlayer(libraryList)
    }
  }
*/
}
