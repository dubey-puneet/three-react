import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentLang } from "../utils/redux/user/user.action"

import "../assets/styles/_footer.scss"

const Footer = () => {
  const { i18n } = useTranslation()
  const dispatch = useDispatch()
  let chk = false
  const chek = useSelector((state) => state.user.currentLang)

  if (chek === "hebrew") {
    chk = false
  } else {
    chk = true
  }

  function changeLanguage(e) {
    let flag = e.target.checked
    if (flag) {
      i18n.changeLanguage("en")
      dispatch(setCurrentLang("en"))
    } else {
      i18n.changeLanguage("hebrew")
      dispatch(setCurrentLang("hebrew"))
    }
  }

  return (
    <div className="footer">
      <label className="switch">
        <input
          type="checkbox"
          checked={chk}
          onChange={(e) => changeLanguage(e)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Footer
