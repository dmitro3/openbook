var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const urls = [
    "https://s.yimg.com/aah/yhst-132422827537450/argentina-45.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/belgium-48.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/brazil-47.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/cameroon-53.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/canada-27.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/croatia-27.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/denmark-32.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/ecuador-36.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/england-33.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/france-31.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/germany-28.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/ghana-35.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/iran-27.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/japan-31.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/mexico-21.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/morocco-21.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/netherlands-22.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/poland-21.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/portugal-21.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/qatar-28.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/saudi-arabia-26.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/senegal-11.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/serbia-22.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/south-korea-22.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/spain-22.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/switzerland-22.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/tunisia-5.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/united-states-23.gif"
    ,"https://s.yimg.com/aah/yhst-132422827537450/uruguay-21.gif"
]

const names = [
    "Argentina.png"
    ,"Belgium.png"
    ,"Brazil.png"
    ,"Cameroon.png"
    ,"Canada.png"
    ,"Croatia.png"
    ,"Denmark.png"
    ,"Ecuador.png"
    ,"England.png"
    ,"France.png"
    ,"Germany.png"
    ,"Ghana.png"
    ,"Iran.png"
    ,"Japan.png"
    ,"Mexico.png"
    ,"Morocco.png"
    ,"Netherlands.png"
    ,"Poland.png"
    ,"Portugal.png"
    ,"Qatar.png"
    ,"Saudi Arabia.png"
    ,"Senegal.png"
    ,"Serbia.png"
    ,"South Korea.png"
    ,"Spain.png"
    ,"Switzerland.png"
    ,"Tunisia.png"
    ,"United States.png"
    ,"Uruguay.png"
]

urls.map((value,index)=>{
    download(urls[index],names[index],()=>{})
})

// download(urls[0],names[0],()=>{console.log("done")})