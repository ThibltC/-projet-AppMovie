const sessionStarageActions = (action, idsGenreSelected, yearMin, yearMax, runTimeMax, numPage) => {
    if (action === 'set') {
        sessionStorage.setItem('idsGenreSelected', JSON.stringify(idsGenreSelected))
        sessionStorage.setItem('yearMin', yearMin)
        sessionStorage.setItem('yearMax', yearMax)
        sessionStorage.setItem('runTimeMax', runTimeMax)
        sessionStorage.setItem('numPage',numPage)
    }
    if (action === 'get') {
        idsGenreSelected = JSON.parse(sessionStorage.getItem('idsGenreSelected'))
        yearMin = sessionStorage.getItem('yearMin')
        yearMax = sessionStorage.getItem('yearMax')
        runTimeMax = sessionStorage.getItem('runTimeMax')
        numPage = sessionStorage.getItem('numPage')

        return {idsGenreSelected, yearMin, yearMax, runTimeMax, numPage}
    }
}

export default sessionStarageActions