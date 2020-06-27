window.onload = function(){

    document.querySelector('.Hotels').setAttribute('style',"display: none;");
    document.querySelector('.ThingsToDo').setAttribute('style',"display: none;")
    document.querySelector('.Restaurants').setAttribute('style',"display: none;")

    var button = document.getElementById('hotel-button')
    button.addEventListener('click',(e)=>{
        if(document.querySelector('.Hotels').getAttribute('style') == "display: none;"){
            document.querySelector('.Hotels').setAttribute('style',"display: initial;");
            document.querySelector('.ThingsToDo').setAttribute('style',"display: none;");
            document.querySelector('.Restaurants').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: none;');
        }
        else{
            document.querySelector('.Hotels').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: initial;');
        }
    });

    var button = document.getElementById('ttdo-button')
    button.addEventListener('click',(e)=>{
        if(document.querySelector('.ThingsToDo').getAttribute('style') == "display: none;"){
            document.querySelector('.ThingsToDo').setAttribute('style',"display: initial;")
            document.querySelector('.Hotels').setAttribute('style',"display: none;");
            document.querySelector('.Restaurants').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: none;');
        }
        else{
            document.querySelector('.ThingsToDo').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: initial;');
        }
    });

    var button = document.getElementById('rest-button')
    button.addEventListener('click',(e)=>{
        if(document.querySelector('.Restaurants').getAttribute('style') == "display: none;"){
            document.querySelector('.Restaurants').setAttribute('style',"display: initial;")
            document.querySelector('.ThingsToDo').setAttribute('style',"display: none;");
            document.querySelector('.Hotels').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: none;');
        }
        else{
            document.querySelector('.Restaurants').setAttribute('style',"display: none;");
            document.querySelector('.tagline').setAttribute('style','display: initial;');
        }
    });

    //For Hotel Searching 


    var count = 0;
    const btns = this.document.querySelector('.Hotel-btn');

    btns.addEventListener('click', (e) => {
        e.preventDefault();
        if(count != 0){
            const myNode = document.getElementById("main");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
        }
        count += 1;
        var query = [];
        var checkin = null;
        var checkout = null;
        var nop = 1;
        var nor = 1;
        search = this.document.querySelector('.Hotel-input').value;
        checkin = this.document.querySelector('.checkin-input').value;
        checkout = this.document.querySelector('.checkout-input').value;
        nop = this.document.querySelector('.nop-input').value;
        if (nop <= 4 ){ nor = 1}
        else if (nop <=8 && nop > 4 ){ nor = 2}
        else if (nop <=12 && nop > 8 ){ nor = 3}
        else if (nop <=16 && nop > 12 ){ nor = 4}
        else if (nop <=20 && nop > 16 ){ nor = 5}
        for(let i=0 ; i< search.length ;i++){
            if(search[i] == ' '){
                query += '%20';
            }
            else{
                query += search[i];
            }
        }
        console.log(query);
        $.ajax({
            async: true,
            crossDomain: true,
            url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=3&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
            method: "GET",
            headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lon = datas.data[0].result_object.longitude;
                var lat = datas.data[0].result_object.latitude;
                console.log(lat,lon);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=INR&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${loc_id}&adults=${nop}&checkin=${checkin}&checkout=${checkout}&rooms=${nor}&nights=2`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
                    },
                    success : function(Data){
                        console.log(Data);
                        let newh = document.createElement('h3');
                        newh.innerText = "Results for"+ '"'+document.querySelector('.Hotel-input').value + '"';
                        document.querySelector('#main').appendChild(newh);
                        for(let i=0 ; i< Data.data.length ; i++){
                        let newdiv = document.createElement('div');
                        newdiv.classList.add('card');
                        newdiv.setAttribute('style','width: 12rem; display : inline-block;');
                        let newspan = document.createElement('span');
                        let newimg = document.createElement('img');
                        newimg.classList.add('card-img-top');
                        let newspanone = document.createElement('span');
                        newspanone.classList.add('card-body');
                        let newp = document.createElement('h5');
                        let newpone = document.createElement('p');
                        newpone.classList.add('card-text');
                        newpone.innerText = "Rating :" + Data.data[i].rating;
                        let newptwo = document.createElement('p');
                        newptwo.classList.add('card-text');
                        newptwo.innerText = "Price :" + Data.data[i].price;
                        newp.classList.add('card-title');
                        newp.innerText = Data.data[i].name;
                        
                        
                        if(Data.data[i].photo.images.small.url){
                            newimg.setAttribute('src',Data.data[i].photo.images.small.url);
                            newimg.setAttribute('width',Data.data[i].photo.images.small.width);
                            newimg.setAttribute('height',Data.data[i].photo.images.small.height);
                        }
                        else{
                            newimg.setAttribute('src',"https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png");
                            newimg.setAttribute('width','150px');
                            newimg.setAttribute('height','150px');
                        }
                        document.querySelector('.slideshow').setAttribute('style','display:none;');
                        document.querySelector('#main').appendChild(newdiv);
                        document.querySelector('#main').classList.add('main-class');
                        newdiv.appendChild(newspan);
                        newspan.appendChild(newimg);
                        newdiv.appendChild(newspanone);
                        newspanone.appendChild(newp);
                        newspanone.appendChild(newpone);
                        newspanone.appendChild(newptwo);
                        }
                    },

                    error : function(responseText){
                        alert("Retry!");
                    }

                });
            },

            error : function(responseText){
                alert("Retry!");
            }
        });
    });
    



    // For To Do Things searching
    

    const btns1 = this.document.querySelector('.ttdo-btn');
    btns1.addEventListener('click', (e) => {
        e.preventDefault();
        if(count != 0){
            const myNode = document.getElementById("main");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
        }
        count += 1;
        var query = []
        search = this.document.querySelector('.ttdo-input').value;
        for(let i=0 ; i< search.length ;i++){
            if(search[i] == ' '){
                query += '%20';
            }
            else{
                query += search[i];
            }
        }
        console.log(query);

        $.ajax({
            async: true,
            crossDomain: true,
            url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=3&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
            method: "GET",
            headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lon = datas.data[0].result_object.longitude;
                var lat = datas.data[0].result_object.latitude;
                console.log(lon,lat);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=INR&limit=30&distance=5&lang=en_US&longitude=${lon}&latitude=${lat}`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
                    },
                    success : function(Data){
                        console.log(Data);
                        const myNode = document.querySelector("#main .result-head");
                        let newh = document.createElement('h3');
                        newh.innerText = "Results for"+ '"'+document.querySelector('.ttdo-input').value + '"';

                        document.querySelector('#main').appendChild(newh);
                        for(let i=0 ; i< Data.data.length ; i++){
                            let newdiv = document.createElement('div');
                            newdiv.classList.add('card');
                            newdiv.setAttribute('style','width: 12rem; display : inline-block;');
                            let newspan = document.createElement('span');
                            let newimg = document.createElement('img');
                            newimg.classList.add('card-img-top');
                            let newspanone = document.createElement('span');
                            newspanone.classList.add('card-body');
                            let newp = document.createElement('h5');
                            newp.classList.add('card-title');
                            newp.innerText = Data.data[i].name;
                            let newpone = document.createElement('p');
                            let newptwo = document.createElement('p');
                            if(Data.data[i].offer_group != null){
                                newpone.classList.add('card-text');
                                newpone.innerText = "Lowest Price :" + Data.data[i].offer_group.lowest_price;
                            }

                            if(Data.data[i].rating != null){
                                newptwo.classList.add('card-text');
                                newptwo.innerText = "Rating :" + Data.data[i].rating;
                            }

                            if(Data.data[i].photo){
                                newimg.setAttribute('src',Data.data[i].photo.images.small.url);
                                newimg.setAttribute('width',Data.data[i].photo.images.small.width);
                                newimg.setAttribute('height',Data.data[i].photo.images.small.height);
                            }
                            else{
                                newimg.setAttribute('src',"https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png");
                                newimg.setAttribute('width','150px');
                                newimg.setAttribute('height','150px');
                            }
                            if(Data.data[i].name != null){
                            document.querySelector('.slideshow').setAttribute('style','display:none;');
                            document.querySelector('#main').appendChild(newdiv);
                            document.querySelector('#main').classList.add('main-class');
                            newdiv.appendChild(newspan);
                            newspan.appendChild(newimg);
                            newdiv.appendChild(newspanone);
                            newspanone.appendChild(newp);
                            newspanone.appendChild(newpone);
                            newspanone.appendChild(newptwo);}
                            }
                    },
                    error : function(textStaus){
                        alert("Retry!");
                    }
                });
            },
            error : function(textStaus){
                alert("Retry!");
            }
        });
    });





    // For Restaurant searching


    const btns2 = this.document.querySelector('.rest-btn');
    btns2.addEventListener('click', (e) => {
        e.preventDefault();
        if(count != 0){
            const myNode = document.getElementById("main");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
        }
        count += 1;
        var query = [];
        search = this.document.querySelector('.rest-input').value;
        for(let i=0 ; i< search.length ;i++){
            if(search[i] == ' '){
                query += '%20';
            }
            else{
                query += search[i];
            }
        }
        console.log(query);

        $.ajax({
            async: true,
            crossDomain: true,
            url: `https://tripadvisor1.p.rapidapi.com/locations/auto-complete?lang=en_US&units=km&query=${query}`,
            method: "GET",
            headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lat = datas.data[0].result_object.latitude;
                var lon = datas.data[0].result_object.longitude;
                console.log(lat,lon);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=INR&distance=2&lunit=km&lang=en_US&latitude=${lat}&longitude=${lon}`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "d7cba70ccemsh3f8772c38439081p192d7djsneb2afa10c4cc"
                    },
                    success : function(Data){
                        console.log(Data);
                        let newh = document.createElement('h3');
                        newh.innerText = "Results for"+ '"'+document.querySelector('.rest-input').value + '"';
                        document.querySelector('#main').appendChild(newh);
                        for(let i=0 ; i< Data.data.length ; i++){
                            let newdiv = document.createElement('div');
                            newdiv.classList.add('card');
                            newdiv.classList.add('col-auto');
                            newdiv.setAttribute('style','width: 12rem; display : inline-block;');
                            let newspan = document.createElement('span');
                            let newimg = document.createElement('img');
                            newimg.classList.add('card-img-top');
                            let newspanone = document.createElement('span');
                            newspanone.classList.add('card-body');
                            let newp = document.createElement('h5');
                            let newpone = document.createElement('p');
                            if(Data.data[i].rating != null){
                                newpone.classList.add('card-text');
                                newpone.innerText = "Rating :" + Data.data[i].rating;
                            }
                            newp.classList.add('card-title');
                            newp.innerText = Data.data[i].name;
                            if(Data.data[i].photo){
                                newimg.setAttribute('src',Data.data[i].photo.images.small.url);
                                newimg.setAttribute('width',Data.data[i].photo.images.small.width);
                                newimg.setAttribute('height',Data.data[i].photo.images.small.height);
                            }
                            else{
                                
                                newimg.setAttribute('src',"https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available.png");
                                newimg.setAttribute('width','150px');
                                newimg.setAttribute('height','150px');
                            }
                            if(Data.data[i].name != null){
                            document.querySelector('.slideshow').setAttribute('style','display:none;');
                            document.querySelector('#main').appendChild(newdiv);
                            document.querySelector('#main').classList.add('main-class');
                            newdiv.appendChild(newspan);
                            newspan.appendChild(newimg);
                            newdiv.appendChild(newspanone);
                            newspanone.appendChild(newp);
                            newspanone.appendChild(newpone);}
                            }
                    },
                    error : function(textStaus){
                        alert("Retry!");
                    }
                });
            },
            error : function(textStaus){
                alert("Retry!");
            }
        });
    });
}