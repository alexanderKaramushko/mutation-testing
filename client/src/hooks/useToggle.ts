import { useState } from "react"

export default (initialToggled: boolean = false) => {
  const [toggled, setToggled] = useState(initialToggled);

  return {
    toggled,
    toggle: () => {
      setToggled(!toggled);
    }
  }
}
