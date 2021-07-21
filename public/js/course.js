var config = {
    apiKey: "AIzaSyDSxh_LxDGIjIiPuynem26dlW-gBWdyMVI",
    authDomain: "form-a734e.firebaseapp.com",
    projectId: "form-a734e",
    storageBucket: "form-a734e.appspot.com",
    messagingSenderId: "338917384144",
    appId: "1:338917384144:web:ce462c62e5ab6acdbfa3d5"
};
firebase.initializeApp(config);
const database = firebase.firestore();

console.log(document.getElementById("chapter").innerText);

database.collection('/Courses/Class 5/Programming/Chapter 3/Overview/').get().then(async(querySnapshot) => {

    await querySnapshot.forEach((userDoc) => {

        var userDocData = userDoc.data()
        console.log(userDocData);

        document.getElementById("p1").innerText = userDocData.courseDesc;
        document.getElementById("p2").innerText = userDocData.certification;
        document.getElementById("p3").innerText = userDocData.learningOutcomes;


    })

    

});

// var parentNode = document.getElementById('video')
// console.log(parentNode.children[1].children[0].children[1])
// var anchor = document.getElementsByClassName('vid')
// console.log(anchor[0])
var ytVideo = document.querySelector('iframe')
// ytVideo.src = '#'
console.log(ytVideo)
function onClick(event){
    if(event){
    // const reg = '/watch/gm'
    // const str = "embed";
    var href = event.currentTarget.getAttribute('href')
    event.preventDefault();
    if(!href.includes("&")){
    var ytVideo = document.querySelector('iframe')
    console.log(ytVideo)
    
    
    var url= href.replace('watch?v=','embed/');
    // href.replace(reg,str)
    ytVideo.src = url
    console.log(url)
    }
    else{
        var splits = href.split('&')
        console.log(splits)
        var ytVideo = document.querySelector('iframe')
        console.log(ytVideo)
        // event.preventDefault();
        
        var url= splits[0].replace('watch?v=','embed/');
        // href.replace(reg,str)
        ytVideo.src = url
        console.log(url)
    }
    }
    // console.log(event.srcElement)
    // console.log(event.target)
}

database.collection('/Courses/Class 5/Programming/Chapter 3/Curriculum').get().then(async(querySnapshot) => {

    await querySnapshot.forEach((userDoc) => {

        var curriculumData = userDoc.data()
        console.log(curriculumData);
        var parentNode = document.getElementById('video')
        var random = document.getElementById('random')
        for (const [key, value] of Object.entries(curriculumData)) {
            console.log(`${key}: ${value}`);
            for (const [key1, value1] of Object.entries(value)){
                console.log(`${key1}: ${value1}`)
                if(`${key1}`=='youtubelink'){
                var doc = document.createElement('div')
                var para = document.createElement('p')
                var anchor = document.createElement('a')
                var italic = document.createElement('i')
                var foo = document.createTextNode("\u00A0");
                var foos = document.createTextNode( '\u00A0\u00A0' )
                anchor.href = `${value1}`
                anchor.innerHTML = '<b>vid</b>'
                anchor.setAttribute("onclick","onClick(event)");
                // anchor.onclick = onClick(event)
                doc.classList.add('row','row1','br')
                para.classList.add('size')
                anchor.classList.add('atag')
                italic.classList.add('far','fa-file-alt')
                para.append(italic,foo,`${key}`,foos,anchor)
                doc.append(para)
                parentNode.insertBefore(doc,random)
                }
                

            }
          }
      


    })

    

});
