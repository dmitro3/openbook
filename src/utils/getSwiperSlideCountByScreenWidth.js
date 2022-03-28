export const getSwiperSlideCountByScreenWidth = () =>{
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if(vw >= 1700){
        return 3
    }
    else if (vw >= 1200 ){
        return 2
    }
    else {
        return 1
    }
}