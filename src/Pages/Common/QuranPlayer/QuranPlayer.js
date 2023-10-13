import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import addNotification from "react-push-notification"
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons"
export const QuranPlayer = ({
  audioREF,
  swraINFO,
  shaykhINFO,
  isPlayingSound,
  setIsPlayingSound,
  currentSwra,
  setCurrentSwra,
  currentList,
  soundTimeInfo,
  setSoundTimeInfo,
  playListState,
  whatIsTheListNow,
}) => {
  // console.log(currentList)
  const audio = swraINFO.link
  // console.log(audioREF)
  // const [soundTimeInfo, setSoundTimeInfo] = useState({
  //   currentTime: 0,
  //   duration: 0,
  // })

  const TimeInfoHandler = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration

    setSoundTimeInfo({
      currentTime,
      duration,
    })
  }

  const formatTimeFromSeconds = time => {
    if (!time) {
      return `00:00:00`
    } else {
      const res = new Date(time * 1000).toISOString().slice(11, 19)
      // console.log(result)
      return res
    }
  }
  const getSliderTimeInfo = e => {
    // console.log(e.target.value)
    audioREF.current.currentTime = e.target.value
    setSoundTimeInfo({ ...soundTimeInfo, currentTime: e.target.value })
    // const formatSliderTime = formatTimeFromSeconds(e.target.value)
    // console.log(formatSliderTime)
  }

  // console.log(audio)
  // console.log(audioREF.current.src)
  // console.log(audio == audioREF.current.src)

  const isPlayingSoundState = () => {
    setIsPlayingSound(!isPlayingSound)
    doPlaySound()
  }

  const doPlaySound = () => {
    const playAudioPromis = audioREF.current.play()
    if (isPlayingSound === false) {
      playAudioPromis.then(playAudioPromis => audioREF.current.play())
    } else if (isPlayingSound === true) {
      audioREF.current.pause()
    }
  }

  const getCurrentSurahIndexInTheCurrentList = () => {
    return currentList.map(li => li.sora_id).indexOf(currentSwra.swraID)
  }

  const skip = dir => {
    const currentSurahIndex = getCurrentSurahIndexInTheCurrentList()

    const playAudioPromis = audioREF.current.play()
    audioREF.current.pause()
    isPlayingSound &&
      playAudioPromis.then(playAudioPromis => audioREF.current.play())
    // for skip back button
    if (dir === "bk") {
      if (!currentSurahIndex) {
        const currentSurah = currentList[currentList.length - 1]
        setCurrentSwra({
          shID: currentSurah.sh_id,
          swraID: currentSurah.sora_id,
        })
      } else {
        const currentSurah = currentList[currentSurahIndex - 1]
        setCurrentSwra({
          shID: currentSurah.sh_id,
          swraID: currentSurah.sora_id,
        })
      }
    }

    // for skip forward button
    if (dir === "fr") {
      if (currentSurahIndex >= currentList.length - 1) {
        const currentSurah = currentList[0]
        setCurrentSwra({
          shID: currentSurah.sh_id,
          swraID: currentSurah.sora_id,
        })
      } else {
        const currentSurah = currentList[currentSurahIndex + 1]
        setCurrentSwra({
          shID: currentSurah.sh_id,
          swraID: currentSurah.sora_id,
        })
      }
    }
  }

  useEffect(() => {
    if (whatIsTheListNow === "PlayList") {
      if (isPlayingSound === true) {
        const isTimeEnded = () => {
          if (
            audioREF.current.currentTime < audioREF.current.duration ||
            audioREF.current.currentTime === 0 ||
            audioREF.current.currentTime === undefined
          ) {
            return false
          } else if (
            audioREF.current.currentTime === audioREF.current.duration
          ) {
            return true
          }
        }

        // console.log(isTimeEnded())

        const id = playListState.map(li => li.sID).indexOf(currentSwra.swraID)

        let nextSurah
        if (id >= playListState.length - 1) {
          nextSurah = currentList[0]
        } else {
          nextSurah = currentList[id + 1]
        }

        if (isTimeEnded() === true) {
          setCurrentSwra({
            shID: nextSurah.sh_id,
            swraID: nextSurah.sora_id,
          })
          // audioREF.current.pause()
        }

        const playPromise = audioREF.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audioREF.current.play()
            })
            .catch(error => {
              // console.log(error)
            })
        }
      }
    }
  }, [soundTimeInfo.currentTime])

  // useEffect(() => {
  //   return () => {
  //     if (whatIsTheListNow === "PlayList") {
  //       if (isPlayingSound === true) {
  //         if (
  //           currentSwra.swraID === playListState[playListState.length - 1].sID
  //         ) {
  //           addNotification({
  //             title: "Quran PlayList Finished!",
  //             subtitle: "your Quran Playlist Starting again",
  //             message:
  //               "لقد انتهي قرئاني من البلاي ليست التي قمت بتخصيصها وسيتم اعادتها من البداية مرة اخري",
  //             native: true, // when using native, your OS will handle theming.
  //             duration: 5000,

  //             vibrate: 3,
  //             icon: "./pics/quran_logo.JPG",
  //           })
  //         }
  //       }
  //     }
  //   }
  // }, [currentSwra])

  // console.log(swraINFO.link)

  // ما تيسر من سورة <span>{swraINFO.soret}- {swraINFO.soret_ar} </span> للقاريء الشيخ <span>{shaykhINFO.shaykh} - {shaykhINFO.shaykh_ar}</span>
  return (
    <div className="quran-player">
      <div className="quran-player_time-controls">
        <div className="quran-player_time-controls_start-time">
          <p>{formatTimeFromSeconds(soundTimeInfo.currentTime)}</p>
        </div>
        <div className="quran-player_time-controls_slider">
          <input
            className="quran-player_time-controls_slider__slider"
            min={0}
            max={soundTimeInfo.duration || 0}
            value={soundTimeInfo.currentTime}
            onChange={getSliderTimeInfo}
            type="range"
          />
        </div>
        <div className="quran-player_time-controls_end-time">
          <p>{formatTimeFromSeconds(soundTimeInfo.duration)}</p>
        </div>
      </div>

      <div className="quran-player_play-controls">
        <div
          onClick={() => skip("bk")}
          className="quran-player_play-controls_skip-bk"
        >
          <FontAwesomeIcon className="skip-bk-btn" icon={faBackward} />
        </div>
        <div
          onClick={isPlayingSoundState}
          className="quran-player_play-controls_play-btn"
        >
          <FontAwesomeIcon
            className="paly-btn"
            icon={isPlayingSound ? faPause : faPlay}
          />
        </div>
        <div
          onClick={() => skip("fr")}
          className="quran-player_play-controls_skip-fr"
        >
          <FontAwesomeIcon className="skip-fr-btn" icon={faForward} />
        </div>
      </div>

      <div className="quran-info_audio">
        <audio
          onLoadedMetadata={TimeInfoHandler}
          onTimeUpdate={TimeInfoHandler}
          ref={audioREF}
          src={audio}
        ></audio>
      </div>
    </div>
  )
}

// import React, { useEffect, useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faPlay,
//   faPause,
//   faForward,
//   faBackward,
// } from "@fortawesome/free-solid-svg-icons"
// export const QuranPlayer = ({
//   audioREF,
//   swraINFO,
//   shaykhINFO,
//   isPlayingSound,
//   setIsPlayingSound,
//   currentSwra,
//   setCurrentSwra,
//   currentList,
//   soundTimeInfo,
//   setSoundTimeInfo,
// }) => {
//   // console.log(currentList)
//   const audio = swraINFO.link
//   // console.log(audioREF)
//   // const [soundTimeInfo, setSoundTimeInfo] = useState({
//   //   currentTime: 0,
//   //   duration: 0,
//   // })

//   const TimeInfoHandler = e => {
//     const currentTime = e.target.currentTime
//     const duration = e.target.duration

//     setSoundTimeInfo({
//       currentTime,
//       duration,
//     })
//   }

//   const formatTimeFromSeconds = time => {
//     if (!time) {
//       return `00:00:00`
//     } else {
//       const res = new Date(time * 1000).toISOString().slice(11, 19)
//       // console.log(result)
//       return res
//     }
//   }
//   const getSliderTimeInfo = e => {
//     // console.log(e.target.value)
//     audioREF.current.currentTime = e.target.value
//     setSoundTimeInfo({ ...soundTimeInfo, currentTime: e.target.value })
//     // const formatSliderTime = formatTimeFromSeconds(e.target.value)
//     // console.log(formatSliderTime)
//   }

//   // console.log(audio)
//   // console.log(audioREF.current.src)
//   // console.log(audio == audioREF.current.src)

//   const doPlaySound = () => {
//     setIsPlayingSound(!isPlayingSound)
//     if (!isPlayingSound) {
//       audioREF.current.play()
//     } else if (isPlayingSound) {
//       audioREF.current.pause()
//     }
//   }

//   const getCurrentSurahIndexInTheCurrentList = () => {
//     return currentList.map(li => li.sora_id).indexOf(currentSwra.swraID)
//   }

//   const skip = dir => {
//     const currentSurahIndex = getCurrentSurahIndexInTheCurrentList()

//     const playAudioPromis = audioREF.current.play()
//     audioREF.current.pause()
//     isPlayingSound
//       ? playAudioPromis.then(playAudioPromis => audioREF.current.play())
//       : playAudioPromis.then(playAudioPromis => audioREF.current.pause())
//     // for skip back button
//     if (dir === "bk") {
//       if (!currentSurahIndex) {
//         const currentSurah = currentList[currentList.length - 1]
//         setCurrentSwra({
//           shID: currentSurah.sh_id,
//           swraID: currentSurah.sora_id,
//         })
//       } else {
//         const currentSurah = currentList[currentSurahIndex - 1]
//         setCurrentSwra({
//           shID: currentSurah.sh_id,
//           swraID: currentSurah.sora_id,
//         })
//       }
//     }

//     // for skip forward button
//     if (dir === "fr") {
//       if (currentSurahIndex >= currentList.length - 1) {
//         const currentSurah = currentList[0]
//         setCurrentSwra({
//           shID: currentSurah.sh_id,
//           swraID: currentSurah.sora_id,
//         })
//       } else {
//         const currentSurah = currentList[currentSurahIndex + 1]
//         setCurrentSwra({
//           shID: currentSurah.sh_id,
//           swraID: currentSurah.sora_id,
//         })
//       }
//     }
//   }

//   // console.log(swraINFO.link)

//   // ما تيسر من سورة <span>{swraINFO.soret}- {swraINFO.soret_ar} </span> للقاريء الشيخ <span>{shaykhINFO.shaykh} - {shaykhINFO.shaykh_ar}</span>
//   return (
//     <div className="quran-player">
//       <div className="quran-player_time-controls">
//         <div className="quran-player_time-controls_start-time">
//           <p>{formatTimeFromSeconds(soundTimeInfo.currentTime)}</p>
//         </div>
//         <div className="quran-player_time-controls_slider">
//           <input
//             min={0}
//             max={soundTimeInfo.duration || 0}
//             value={soundTimeInfo.currentTime}
//             onChange={getSliderTimeInfo}
//             type="range"
//           />
//         </div>
//         <div className="quran-player_time-controls_end-time">
//           <p>{formatTimeFromSeconds(soundTimeInfo.duration)}</p>
//         </div>
//       </div>

//       <div className="quran-player_play-controls">
//         <div
//           onClick={() => skip("bk")}
//           className="quran-player_play-controls_skip-bk"
//         >
//           <FontAwesomeIcon className="skip-bk-btn" icon={faBackward} />
//         </div>
//         <div
//           onClick={doPlaySound}
//           className="quran-player_play-controls_play-btn"
//         >
//           <FontAwesomeIcon
//             className="paly-btn"
//             icon={isPlayingSound ? faPause : faPlay}
//           />
//         </div>
//         <div
//           onClick={() => skip("fr")}
//           className="quran-player_play-controls_skip-fr"
//         >
//           <FontAwesomeIcon className="skip-fr-btn" icon={faForward} />
//         </div>
//       </div>

//       <div className="quran-info_info">
//         <p direction="right">
//           ما تيسر من سورة <span> {swraINFO.soret_ar} </span> للقاريء الشيخ{" "}
//           <span>{shaykhINFO.shaykh_ar}</span>
//         </p>
//         {/* <marquee direction="right">
//           ما تيسر من سورة <span> {swraINFO.soret_ar} </span> للقاريء الشيخ{" "}
//           <span>{shaykhINFO.shaykh_ar}</span>
//         </marquee> */}
//       </div>

//       <div className="quran-info_audio">
//         <audio
//           onLoadedMetadata={TimeInfoHandler}
//           onTimeUpdate={TimeInfoHandler}
//           ref={audioREF}
//           src={audio}
//         ></audio>
//       </div>
//     </div>
//   )
// }
