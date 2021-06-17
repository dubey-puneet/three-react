let hourArr = []
for (let i = 1; i <= 24; i++) {
  if (i < 10) {
    hourArr.push({ value: "0" + i, label: "0" + i })
  } else {
    hourArr.push({ value: "" + i + "", label: i })
  }
}

let minArr = []
for (let i = 1; i <= 60; i++) {
  if (i < 10) {
    minArr.push({ value: "0" + i, label: "0" + i })
  } else {
    minArr.push({ value: i, label: i })
  }
}

export let hourArray = hourArr
export let minArray = minArr
