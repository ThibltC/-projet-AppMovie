const sessionStarageActions = (action, idsGenreSelected, yearMin, yearMax, runTimeMax) => {
    if (action === 'set') {
        sessionStorage.setItem('idsGenreSelected', idsGenreSelected)
        sessionStorage.setItem('yearMin', yearMin)
        sessionStorage.setItem('yearMax', yearMax)
        sessionStorage.setItem('runTimeMax', runTimeMax)
    }
    if (action === 'get') {
        idsGenreSelected = sessionStorage.getItem('idsGenreSelected')
        yearMin = sessionStorage.getItem('yearMin')
        yearMax = sessionStorage.getItem('yearMax')
        runTimeMax = sessionStorage.getItem('runTimeMax')

        return [idsGenreSelected, yearMin, yearMax, runTimeMax]
    }
}

export default sessionStarageActions