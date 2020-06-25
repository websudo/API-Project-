window.onload = function(){
    
    // btns.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     var query = []
    //     console.log(this.document.querySelector('#input').value);
    //     search = this.document.querySelector('#input').value;
    //     for(let i=0 ; i< search.length ;i++){
    //         if(search[i] == ' '){
    //             query += '%20';
    //         }
    //         else{
    //             query += search[i];
    //         }
    //     }
    //     console.log(query);
    // });
    // $.ajax({
    //     async: true,
	//     crossDomain: true,
	//     url: "https://tripadvisor1.p.rapidapi.com/answers/list?limit=10&question_id=5283833",
	//     method: "GET",
	//     headers: {
	// 	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	// 	"x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
	//     },
    //     success : function(data){
    //         console.log(data);
    //     }
    // });





    // For getting location ID

    // btns.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     var query = [];
    //     console.log(this.document.querySelector('input').value);
    //     search = this.document.querySelector('input').value;
    //     for(let i=0 ; i< search.length ;i++){
    //         if(search[i] == ' '){
    //             query += '%20';
    //         }
    //         else{
    //             query += search[i];
    //         }
    //     }
    //     console.log(query);
    //     $.ajax({
    //         async: true,
    //         crossDomain: true,
    //         url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
    //         method: "GET",
    //         headers: {
    //         "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    //         "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
    //         },
    //         success : function(datas){
    //             var loc_id = datas.data[0].result_object.location_id
    //         }
    //     });
    // });






    // $.ajax({
    //     async: true,
	//     crossDomain: true,
	//     url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
	//     method: "GET",
	//     headers: {
	// 	"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
	// 	"x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
	//     },
    //     success : function(data){
    //         console.log(data);
    //     }
    // });

    //For Hotel Searching 
    
    const btns = this.document.querySelector('.Hotel-btn');
    btns.addEventListener('click', (e) => {
        e.preventDefault();
        var query = [];
        var checkin = null;
        var checkout = null;
        var nop = 1;
        var nor = 1;
        console.log(this.document.querySelector('.Hotel-input').value);
        search = this.document.querySelector('.Hotel-input').value;
        checkin = this.document.querySelector('#checkin-input').value;
        checkout = this.document.querySelector('#checkout-input').value;
        nop = this.document.querySelector('#nop-input').value;
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
            url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
            method: "GET",
            headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lon = datas.data[0].result_object.longitude;
                var lat = datas.data[0].result_object.latitude;
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&hotel_class=1%252C2%252C3&limit=30&adults=${nop}&amenities=beach%252Cbar_lounge%252Cairport_transportation&rooms=${nor}&child_rm_ages=7%252C10&currency=USD&checkin=${checkin}&checkout=${checkout}&zff=4%252C6&subcategory=hotel%252Cbb%252Cspecialty&nights=2&latitude=${lat}&longitude=${lon}`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
                    },
                    success : function(data){
                        console.log(data);
                    }
                });
            }
        });
    });
    

    // For To Do Things searching

    const btns1 = this.document.querySelector('.ttdo-btn');
    btns1.addEventListener('click', (e) => {
        e.preventDefault();
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
            url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${query}`,
            method: "GET",
            headers: {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lon = datas.data[0].result_object.longitude;
                var lat = datas.data[0].result_object.latitude;
                console.log(lon,lat);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude=${lon}&latitude=${lat}`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
                    },
                    success : function(data){
                        console.log(data);
                    }
                });
            }
        });
    });

    // For Restaurant searching
    const btns2 = this.document.querySelector('.rest-btn');
    btns2.addEventListener('click', (e) => {
        e.preventDefault();
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
            "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
            },
            success : function(datas){
                var loc_id = datas.data[0].result_object.location_id;
                var lat = datas.data[0].result_object.latitude;
                var lon = datas.data[0].result_object.longitude;
                console.log(lat,lon);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=${lat}&longitude=${lon}`,
                    method: "GET",
                    headers: {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "8ab030f737mshc395b583794af0fp1786cdjsn2ea1758f4eb1"
                    },
                    success : function(data){
                        console.log(data);
                    }
                });
            }
        });
    });
}