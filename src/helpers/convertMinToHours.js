const convertMinToHours = (min) => {
    const h = Math.trunc(min / 60)
    const m = Math.ceil((min / 60 - h) * 60)
    if (m > 9) return h + 'h' + m
    return h + 'h0' + m
}

export default convertMinToHours