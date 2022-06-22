export const getSwiperSlideCountByScreenWidth = () =>{
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if(vw >= 1920){
        return 4
    }
    else if (vw >= 1400 ){
        return 3
    }
    else if (vw >= 600 ){
        return 2
    }
    else {
        return 1
    }
}

export const getSwiperSlideCountByScreenWidthTeamCards = () =>{
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if(vw >= 1920){
        return 3
    }
    else if (vw >= 1400 ){
        return 2
    }
    else {
        return 1
    }
}