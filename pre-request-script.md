```js

const payload = {
    username: pm.globals.get('username'),
    password: pm.globals.get('password')
}

const requestOptions = {
    url: pm.globals.get('node_api_url')+'/auth/login',
    header:{
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: {
        mode:'raw',
        raw:JSON.stringify(payload)
    }  
};

pm.sendRequest(requestOptions, (err, response) => { 
    if (err) {
        console.error('Login request failed:', err);
    } else {
        try {
            const jsonResponse = response.json(); 
            if (jsonResponse.content && jsonResponse.content.token) {
                pm.globals.set('pervin-icaze', jsonResponse.content.token);
                console.log('Token successfully set:', jsonResponse.content.token);
            } else {
                console.error('Token not found in response:', jsonResponse);
            }
        } catch (e) { 
            console.error('Error parsing response:', e);
        }
    }
}); 

```


```js

pm.test('Status code is 200', function(){
    pm.response.to.have.status(200)
})

pm.test('Response must have a category', function(){

    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('categoryName');
    pm.expect(jsonData).to.have.property('description');
    // pm.expect(jsonData).to.have.property('_id');
    // pm.expect(jsonData).to.have.property('createdDate');


    pm.expect(jsonData.categoryName).to.eql('Yeni Kategori 6');
    pm.expect(jsonData.description).to.eql('Soft, Tea');
})

pm.test('Response includes the correct name', function(){

    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('categoryName');
    pm.expect(jsonData.categoryName).to.eql('Yeni Kategori 6');
});

```